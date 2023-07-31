
const express=require("express");
const cors=require("cors");

const app=express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.json('hello world1')
})


app.post('/register',(req,res)=>{
    const {username,password}=req.body;
    res.json({reqData:{username,password}});
})


app.listen(4000,()=>{
    console.log('listening on port 4000');
});