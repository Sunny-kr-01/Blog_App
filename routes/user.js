const express=require('express')
const {signupUser,signinUser}=require('../controllers/user')
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('signup')
})
router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.post('/signin',signinUser)
router.post('/signup',signupUser)

module.exports= router;