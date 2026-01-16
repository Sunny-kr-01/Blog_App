const USERS = require('../models/user')

async function signupUser(req,res){
    const {fullName,email,password}=req.body;
    try{
        const user=await USERS.create({
            fullName,
            email,
            password
        })
        return res.status(201).json({
            message:"User signed up successfully",
            user
        });
    }catch(err){
        console.log(err);
        return res.render('signup');
    }
}

async function signinUser(req,res){
    const {email,password}=req.body;
}

module.exports={
    signupUser,
    signinUser
}