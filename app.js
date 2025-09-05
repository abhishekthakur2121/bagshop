const cookieParser = require('cookie-parser');
const express = require('express');
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const path = require('path')
app.use(express.static(path.join(__dirname , "public")))


app.set('view engine','ejs');




app.get('/', (req, res)=>{
    res.send('app is working well')
})

app.listen(5000,()=>{
    console.log('running at port number 5000')
})