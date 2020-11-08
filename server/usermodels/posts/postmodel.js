const mongoose=require('mongoose');
const  {ObjectId} =mongoose.Schema.Types
const postScheme=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        default:'post'
    },
    body:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        default:'Pic'
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }

})

mongoose.model("Post",postScheme)