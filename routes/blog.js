const { Router } = require('express')
const multer=require('multer')
const path =require('path')
const BLOGS=require('../models/blog')
const {addNewBlog}=require('../controllers/blog')

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
  console.log(blog)
  res.render('showBlogs',{
    user: req.user,
    blog,
  })
})

module.exports=router;