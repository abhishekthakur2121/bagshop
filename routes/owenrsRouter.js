const express=require('express');
const ownerModel=require('../models/owner-model')
const router=express.Router();


if(process.env.NODE_ENV==="development"){
    router.post('/create',async (req, res)=>{
    
    let owner = await ownerModel.find();
    if(owner.length>1) return res.status(504).send("There allready a owner exist")
     else{
        let {username, email, password,gstin}=req.body;
        const createdOwner= await ownerModel.create({
        username,
        email,
        password
        // gstin

        })
    res.status(201).send(createdOwner)}
});
}


router.get('/admin', (req, res) => {
  const success = req.flash("success");
  const error = req.flash("error");

  res.render("createproducts", { success, error });
});


// app.get('/footer', (req, res) => {

//   res.render('contact'); // or 'footer', depending on the filename
// });


// if(process.env==="development")




module.exports=router;
