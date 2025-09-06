const express=require('express');
const router=express.Router();
const{registerUser}=require('../controller/authController')

router.get('/', (req, res)=>{
    res.send(' hey its working')
})


router.post('/register', registerUser)


module.exports=router;
