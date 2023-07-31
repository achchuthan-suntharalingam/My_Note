const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    active:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('user', userSchema);
