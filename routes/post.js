const express=require('express')
const router=express.Router();
const mongoose=require('mongoose')
const authenticateUser=require('../security/middlewares/loginmiddleware')
const Post=mongoose.model('Post')

// for creating post
    router.route('/createpost')
    .get((req,res)=>{
        res.statusCode=403
    })
    .post(authenticateUser,(req,res,next)=>{
        console.log(req.user)
        const {title,body}=req.body;
        if(!title || !body){
            res.status(422).json({error:"please add all the fields"});
        }
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


    /* For getting all users posts */

        router.route('/userpost')
        .get(authenticateUser,(req,res)=>{
            // console.log(req.user)
            Post.find({})
            .populate("postedBy","_id name")
            .then(posts=>{
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(posts)
            }).catch(err=>console.log(err))
        })
        .post((req,res)=>{
            res.statusCode = 403;
            res.end('Not supported');
        })


        /* For getting Current User posts */
        // router.route('/myposts')
        // .get((req,res,next)=>{
        //     Post.find({postedBy:req.user._id})
        //     .populate("postedBy","_id name")
        //     .then(mypost=>{
        //         res.statusCode=200;
        //         res.setHeader('Content-Type', 'application/json');
        //         res.json(mypost)
        //     }).catch(err=>next(err))
        // })
        router.get('/myposts',authenticateUser,(req,res)=>{
            Post.findOne({postedBy:req.user._id})
            .populate("PostedBy","_id name")
            .then(mypost=>{
                res.json({mypost})
            })
            .catch((err)=>{
                console.log(err)
            })
        })



// router.post('/createpost',authenticateUser,(req,res)=>{
//     const {title,body}=req.body;
    
//     if(!title || !body){
//         res.status(422).json({error:"please add all the fields"});
//     }

//     // console.log(req.user)
//     //for removing password from storing at the field of post
//     req.user.password=undefined
//     const post=new Post({
//         title,
//         body,
//         postedBy:req.user
//     })
//     post.save()
//     .then(result=>{
//         res.status(200).json({post:result})
//     })
//     .catch(err=>{console.log("Error ",err)})
// })

// // router.route('/posts')
// // .get((req,res)=>{
// //     Post.find({})
// //     .then(posts=>{
// //         res.json({posts})
// //     })
// //     .catch(err=>{
// //         console.log(err)
// //     })
// // })
// // .post((authenticateUser,(req,res,next)=>{
// //     Post.create({
// //         const post=new Post({
// //         title,
// //         body,
// //         postedBy:req.user
// //     })
// //     })
// //     .then((posts)=>{
// //         res.statusCode=200;
// //         res.json(posts)
// //     },(err)=>next(err)).catch((err)=>next(err))
// // }))

module.exports=router;