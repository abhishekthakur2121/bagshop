const bcrypt=require('bcryptjs')
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken')
// router.use(cookieParser());
const userModel = require('../models/user-model');

module.exports.registerUser=async function(req, res){
    try {
        let{username , password,  email}=req.body;
        let user=await userModel.findOne({email:email});
        if(user)return res.status(400).send('bhai apka account pehle se hai to jao login kro')
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser=await userModel.create({
        username,
        password:hashedPassword,
        email
     });
     const token=jwt.sign({email:email}, process.env.JWT_KEY)
     res.cookie("token", token)
     res.send( createdUser);
    
    } catch (error) {
        res.status(500).send(error.message);

    }


};
