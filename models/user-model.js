const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/bagshop");


const userSchema= mongoose.Schema({

    username:String,
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