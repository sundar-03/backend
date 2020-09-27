const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = require('./router');
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require('express-session');

// Passport Config
require('./passport/setup')(passport);

const app = express();


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan("dev"));

app.use('/', router);


mongoose.connect("mongodb://localhost/vortex", {useNewUrlParser:true, useUnifiedTopology:true}, (err)=>{
    if(!err){
        console.log("Database connected!")
    }
})

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.listen(5000,()=>{
    console.log("Server Started on Port 5000");
});



