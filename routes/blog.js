const { Router } = require('express')
const multer=require('multer')
const path =require('path')
const BLOGS=require('../models/blog')
const COMMENTS=require('../models/comment')
const {addNewBlog,addComment}=require('../controllers/blog')

const router=new Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'))
  },
  filename: function (req, file, cb) {
    const fileName=`${Date.now()}-${file.originalname}`;
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage })

router.get('/new',(req,res)=>{
    res.render('addBlog',{
        user:req.user
    })
});
router.post('/new',upload.single('coverImage'),addNewBlog);

router.get('/:id',async(req,res)=>{
  const blog = await BLOGS.findById(req.params.id).populate('createdBy');
  const comments =await  COMMENTS.find({blog:req.params.id}).populate('user')
  res.render('showBlogs',{
    user: req.user,
    blog,
    comments
  })
})

router.post('/comment/:blog_id',addComment)

module.exports=router;