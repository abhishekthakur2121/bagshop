const mongoose = require('mongoose');
const ownerSchema= mongoose.Schema({
    username:{
        type:String,
        minLenght:2,
        trim:true,
    },
    email:String,
    password:String,
    products:{
        type:Array,
        default:[]
    },
    picture:String,
    gstin:String

}); 
module.exports=mongoose.model('owner', ownerSchema)