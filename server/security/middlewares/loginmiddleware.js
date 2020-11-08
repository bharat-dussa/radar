/* 
    authorization : Bearer <token>
        if(!auth) Bearer " " : Bearer <token>
    401: Unauthorized
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJfaWQiOiI1ZmE0ZWFmMjk0N2UyZDFiMzhjMjMxOTgiLCJpYXQiOjE2MDQ2NTIyOTN9.OWoik4m4q9ZBhrOCnt41rBI6dVXJGmwh8irBEBHy2WI
*/
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../keys/keys')
const mongoose=require('mongoose')
const User=mongoose.model('User')
// const JWtStratergy=require('passport-jwt').Strategy
// const ExtractJwt=require('passport-jwt').ExtractJwt
// var jwt=require('jsonwebtoken')
// var config=require('../keys/keys')
module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    const token=authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in"})
        
        }else{
            const {_id} =payload
            User.findById(_id).then(data=>{
                req.user=data;
                next()
            })
          
        }   
    })
}
