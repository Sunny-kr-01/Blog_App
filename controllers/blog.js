const BLOGS=require('../models/blog')
const COMMENTS=require('../models/comment')
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

async function addComment(req,res){
    await COMMENTS.create({
        blog:req.params.blog_id,
        user:req.user._id,
        content:req.body.content
    })
    res.redirect(`/blog/${req.params.blog_id}`)
  
}

module.exports={
    addNewBlog,
    addComment
}