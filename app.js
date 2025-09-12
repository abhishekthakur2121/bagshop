const express = require('express');
const cookieParser = require('cookie-parser');
const db=require('./config/mongoose-connection')
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const path = require('path');
const expressSession=require('express-session');
const flash=require('connect-flash')
// const ownerModel = require('./models/owner-model');
app.use(express.static(path.join(__dirname , "public")))
const ownersRouter=require('./routes/owenrsRouter');
const usersRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');
const indexRouter=require('./routes/indexRouter')
require("dotenv").config();
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET
}));

app.use(flash());
app.set('view engine','ejs');

app.use('/', indexRouter)
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.use((req, res, next) => {
  res.locals.loggedin = !!req.user;   // true if logged in
  res.locals.user = req.user || null; // full user object
  next();
});


app.listen(5000,()=>{
    console.log('running at port number 5000')
})


