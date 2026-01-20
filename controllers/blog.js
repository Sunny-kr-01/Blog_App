

async function addNewBlog(req,res){
    console.log(req.body);
    console.log(req.file);
    res.redirect('/')
}

module.exports={
    addNewBlog
}