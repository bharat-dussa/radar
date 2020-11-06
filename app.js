const express= require('express')
const app= express()
const mongoose=require('mongoose')
const PORT=5004
const {MONGOURI}=require('./security/keys/keys')

require('./usermodels/users')

app.use(express.json())
app.use(require('./security/routes/auth'))

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
const signupMiddleware=(req,res,next)=>{
    console.log("middleware executed")
}

app.get('/',(req,res)=>{
    console.log("Printing the root folder data")
    res.send("Yeah this is working")
})

app.get('/about',signupMiddleware,(req,res)=>{
    console.log("about")
    res.send("Yeah this is working")
})

app.listen(PORT,()=>{
    console.log("Server is running on",PORT)
})