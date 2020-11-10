const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); 

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    college:{
        type:String,
        required:true,

    },
    department:{
        type:String,
        required:true,

    },
    mobile:{
        type:Number,

    }
    
})

userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("User", userSchema);