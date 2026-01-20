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
        const token= await USERS.matchPasswordandGenerateToken(email,password)
        return res.cookie('token',token).redirect('/')
    }
    catch(error){
        res.render('signin',{error:"Email or password not found"})
    }
    
}

module.exports={
    signupUser,
    signinUser
}