const USERS = require('../models/user')

async function signupUser(req,res){
    const {fullName,email,password}=req.body;
    try{
        const user=await USERS.create({
            fullName,
            email,
            password
        })
        return res.render('signin');
    }catch(err){
        console.log(err);
        return res.render('signup');
    }
}

async function signinUser(req,res){
    const {email,password}=req.body;
    try{
        const user= await USERS.matchPassword(email,password)
    console.log(user)
    res.redirect('/')
    }
    catch(error){
        res.render('signin',{error:"Password or email not found"})
    }
    
}

module.exports={
    signupUser,
    signinUser
}