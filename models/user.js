const { error } = require('console');
const {createHmac,randomBytes}=require('crypto');
const mongoose = require('mongoose');
const {generateToken}=require('../services/authentication');

const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:'/images/default.png',
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    const user=this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashedPassword= createHmac('sha256',salt)
    .update(this.password)
    .digest("hex")

    this.salt=salt;
    this.password=hashedPassword;
})

userSchema.static('matchPasswordandGenerateToken',async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new Error("User not found");

    const salt=user.salt;
    
    const userProvidedHash=createHmac('sha256',salt)
    .update(password)
    .digest("hex")

    if(userProvidedHash!==user.password) throw new Error("Wrong Password");

    const token=generateToken(user);
    return token;
})

const USERS=mongoose.model('users',userSchema);

module.exports=USERS;

