const path=require('path')
const express=require('express');

const app=express();
const PORT=67

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
})