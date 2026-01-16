const {createHmac,randomBytes}=require('crypto');
const mongoose = require('mongoose');

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
        default:'/public/images/default.png',
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

const USERS=mongoose.model('users',userSchema);

module.exports=USERS;

