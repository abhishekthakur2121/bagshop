const mongoose = require('mongoose');
const userSchema= mongoose.Schema({

    username:{
        type:String,
        minLenght:2,
        trim:true,
    },
    email:String,
    password:String,
    cart:{
        type:Array,
        default:[]
    },
    isadmin:Boolean,
    order:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String

});

module.exports=mongoose.model('user', userSchema)