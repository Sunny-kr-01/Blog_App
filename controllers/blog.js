const BLOGS=require('../models/blog')
const path= require('path')

async function addNewBlog(req,res){
    const {title,body,}=req.body;
    const blog=await BLOGS.create({
        title,
        body,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`
    })
    res.redirect(`/blog/${blog._id}`)
}

module.exports={
    addNewBlog
}