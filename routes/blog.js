const { Router } = require('express')
const BLOGS=require('../models/blog')
const {addNewBlog}=require('../controllers/blog')
const router=new Router();

router.get('/new',(req,res)=>{
    res.render('addBlog',{
        user:req.user
    })
});
router.post('/new',addNewBlog);

module.exports=router;