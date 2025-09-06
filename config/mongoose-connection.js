const mongoose = require('mongoose');
const dbgr= require('debug')("development:mongoose")
const config= require('config');
mongoose.connect(config.get('MONGODB_URI'))
.then(function(){
   dbgr('Mongodb Connected successfully');
})
.catch(function(err){
   dbgr(err) 
});
module.exports=mongoose.connection;
