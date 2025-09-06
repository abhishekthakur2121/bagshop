const express = require('express');
const cookieParser = require('cookie-parser');
const db=require('./config/mongoose-connection')
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const path = require('path');
// const ownerModel = require('./models/owner-model');
app.use(express.static(path.join(__dirname , "public")))
const ownersRouter=require('./routes/owenrsRouter');
const usersRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');
const indexRouter=require('./routes/indexRouter')
require("dotenv").config();


app.set('view engine','ejs');

app.use('/', indexRouter)
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(5000,()=>{
    console.log('running at port number 5000')
})