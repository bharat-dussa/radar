const express=require('express')
const router=express.Router();
const mongoose=require('mongoose')
const authenticateUser=require('../security/middlewares/loginmiddleware')
const Post=mongoose.model('Post')

// for creating post
router.post('/createpost',authenticateUser,(req,res)=>{
    const {title,body}=req.body;
    
    if(!title || !body){
        res.status(422).json({error:"please add all the fields"});
    }

    // console.log(req.user)
    //for removing password from storing at the field of post
    req.user.password=undefined
    const post=new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save()
    .then(result=>{
        res.status(200).json({post:result})
    })
    .catch(err=>{console.log("Error ",err)})
})

module.exports=router;