const path=require('path')
const express=require('express');
const mongoose=require('mongoose');
const userRouter=require('./routes/user')

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

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT} at http://localhost:67`)
})