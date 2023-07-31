
const express=require("express");
const cors=require("cors");
const { default: mongoose } = require("mongoose");
const User=require('./models/User');

const app=express();




app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://geoffgeorge107:Ag2M7UvZx9JdxY4L@cluster1.r6awora.mongodb.net/?retryWrites=true&w=majority')


app.get('/',(req,res)=>{
    res.json('hello world1')
})


app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    const UserDoc=await User.create({username,password});
    res.json(UserDoc);
})


app.listen(4000,()=>{
    console.log('listening on port 4000');
});
// Ag2M7UvZx9JdxY4L

// mongodb+srv://geoffgeorge107:Ag2M7UvZx9JdxY4L@cluster1.r6awora.mongodb.net/?retryWrites=true&w=majority