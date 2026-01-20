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
router.post('/new',upload.single('image'),addNewBlog);

module.exports=router;