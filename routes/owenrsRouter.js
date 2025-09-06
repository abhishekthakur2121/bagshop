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


router.get('/', (req, res)=>{
    res.send('working')
})

// if(process.env==="development")




module.exports=router;
