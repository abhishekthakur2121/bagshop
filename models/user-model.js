const mongoose = require('mongoose');
const userSchema= mongoose.Schema({

    username:{
        type:String,
        minLenght:2,
        trim:true,
    },
    email:String,
    password:String,
     cart: [
      {
      type: mongoose.Schema.Types.ObjectId,
       ref: "product"
      }
     ],
    order:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    contact:Number,
    picture:String

});

module.exports=mongoose.model('user', userSchema)