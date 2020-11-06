const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User= mongoose.model("User")
const bcrypt= require('bcryptjs')
const authenticateUser=require('../security/middlewares/loginmiddleware')

// for generating token
const jwt=require('jsonwebtoken') 
const{JWT_SECRET}=require('../security/keys/keys')

router.get('/access',authenticateUser,(req,res)=>{
    res.send("hello from auth")
})


//sign up page
router.post('/signup',(req,res)=>{
    // console.log(req.body.name)
    const {name,email,password}=req.body

    if(!email|| !password || !name){
       return res.status(422).json({error:"required fields are mandatory"})

    }

    //checking for existences
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,18)
        .then(hashedpassword=>{
            
            const user= new User({
                email,
                password:hashedpassword,
                name
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
                //console.log("Saved successfully")
            })
            .catch(err=>{
                console.log(err)
            })

        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})

//sign in
router.post('/signin',(req,res)=>{
    const{email,password}=req.body
    if (!email || !password){
        return res.status(422).json("Please add email or password")
    }

    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Forgot email or password?"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token:token})
                //res.json({message:"Successfully signed in"})
            }
            else{
                res.status(422).json({error:"Invalid email or password"})
            }
        }).catch(err=>{
            console.log(err)
        })
    })
    })

//exports to external
module.exports=router