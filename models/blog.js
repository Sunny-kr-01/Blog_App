const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        typr:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{timestsmps:true})

const BLOGS=mongoose.model('blogs',blogSchema);

module.exports= BLOGS