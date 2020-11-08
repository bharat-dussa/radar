const express= require('express')
const app= express()
const mongoose=require('mongoose')
const PORT=5004
const {MONGOURI}=require('./security/keys/keys')


//cahnegs made cbshbcjshb

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB")

})
mongoose.connection.on('error',()=>{
    console.log("Error occured")
})

// SCHEMA MODELS
require('./usermodels/users')
require('./usermodels/posts/postmodel')

//Routes for 
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

const signupMiddleware=(req,res,next)=>{
    console.log("middleware executed")
}

app.get('/',(req,res)=>{
    console.log("Printing the root folder data")
    res.send("Yeah this is working")
})

app.get('/about',signupMiddleware,(req,res)=>{
    console.log("about")
    res.send("Yeah This is about page")
    res.json({message:"Hello this is about page"})
})

app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})