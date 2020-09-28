const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = require('./router');
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();

const setupPasso=port = require('./passport/setup');


mongoose.connect("mongodb://localhost/vortex", {useNewUrlParser:true, useUnifiedTopology:true}, (err)=>{
    if(!err){
        console.log("Database connected!")
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


app.listen(5000,()=>{
    console.log("Server Started on Port 5000");
});



