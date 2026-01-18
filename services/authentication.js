const jwt=require('jsonwebtoken');
const secret='Thunder@!$&';
const User=require('../models/user');

async function generateToken(user){
    const payload={
        _id:user._id,
        email:user.email,
        role:user.role
    };
    return jwt.sign(payload,secret);
}

async function verifyToken(token){
    const payload = jwt.verify(token,secret);
    return payload
}

module.exports={
    generateToken,
    verifyToken
};