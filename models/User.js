const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,

    },
    Email:{
        type:String,
        required:true,

    },
    College:{
        type:String,
        required:true,

    },
    Department:{
        type:String,
        required:true,

    },
    Mobile:{
        type:Number,

    },
    Password:{
        type:String,
        required:true,

    }
    
})

module.exports = mongoose.model("User", userSchema);