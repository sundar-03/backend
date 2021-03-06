require('dotenv').config({path: "./env/.env"})

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require('cors')

const router = require('./router');
const pino = require("pino");

const app = express();

// TODO: global variable NOT recommended (pollution)
// Idea is to have a logger configured once here and use it in other files.

global.logger = pino({
  level: process.env.LOG_LEVEL || "info",
  prettyPrint: process.env.ENV === "DEV",
});

const setupPassport = require('./passport/setup');

function construct_connection_uri(env_dict){
    let {DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME, DB_AUTHDB} = env_dict

    // TODO: If the passwords contain non alphanumeric characters, escape them.
    return `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_AUTHDB}`
} 

mongoose.connect(construct_connection_uri(process.env), {useNewUrlParser:true, useUnifiedTopology:true}, (err)=>{
    if(!err){
        logger.info("Database connected!")
    }
    else {
        console.log(err)
        logger.error(err)
    }
})
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use(morgan("dev"));

app.use('/', router);
app.use(express.static('frontend/build'))

app.use(function (req, res) {
    res.sendFile("/frontend/build/index.html");
  });

app.listen(process.env.SERVER_PORT,()=>{
    logger.info("Listening on " + process.env.SERVER_PORT);
});



