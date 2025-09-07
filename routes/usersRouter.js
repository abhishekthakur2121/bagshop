const express=require('express');
const router=express.Router();
const{registerUser, loginUser}=require('../controller/authController')

router.get('/', (req, res)=>{
    res.send(' hey its working')
})


router.post('/register', registerUser)

router.post('/login', loginUser)


module.exports=router;
