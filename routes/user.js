const express=require('express')
const {signupUser,signinUser}=require('../controllers/user')
const router=express.Router();


router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.get('/signin',(req,res)=>{
    res.render('signin');
})
router.post('/signin',signinUser)
router.post('/signup',signupUser)

module.exports= router;