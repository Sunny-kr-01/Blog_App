const path=require('path')
const express=require('express');
const mongoose=require('mongoose');
const userRouter=require('./routes/user')
const blogRouter=require('./routes/blog')
const{checkForAuthenticationCookie}=require('./middlewares/authentication')
const BLOGS=require('./models/blog')

const cookieParser=require('cookie-parser');
const USERS = require('./models/user');

mongoose.connect('mongodb://localhost:27017/Beelog')
.then(()=>{
    console.log("Mongo DB connected")
})
.catch((err)=>{
    console.log(err);
})

const app=express();
const PORT=67

app.use(express.urlencoded({extended:'false'}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve('./public')))

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.use(checkForAuthenticationCookie('token'));

app.get('/',async(req,res)=>{
    const all_blogs=await BLOGS.find({});
    res.render('home',{
        user:req.user,
        blogs:all_blogs,
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        user:req.user,
    })
})


app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT} at http://localhost:67`)
})