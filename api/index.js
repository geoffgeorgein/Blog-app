
const express=require("express");
const cors=require("cors");
const  mongoose = require("mongoose");
const User=require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' });
const uploadMiddleware = multer({ dest: 'uploads/' });

const app=express();
app.use(cookieParser())

const salt=bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';


app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));    

mongoose.connect('mongodb+srv://geoffgeorge107:Ag2M7UvZx9JdxY4L@cluster1.r6awora.mongodb.net/?retryWrites=true&w=majority')


app.get('/',(req,res)=>{
    res.json('hello world1')
})


app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    
    const UserDoc=await User.create({
        username,
        password:bcrypt.hashSync(password,salt)
    });
    res.json(UserDoc);
})

app.post('/login',async(req, res)=>{
    
    const {username,password} = req.body;
    const userDoc=await User.findOne({username});

    const passOK=bcrypt.compareSync(password,userDoc.password);
    // res.json(passOK);

    if(passOK){
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json({
              id:userDoc._id,
              username,
            });
          });
    }
    else {
        res.status(400).json("wrong credentials");
      }

}
);

app.get('/profile',(req, res) => {

    console.log('Cookies: ', req.cookies);
    console.log('signed Cookies: ', req.signedCookies);

    const{token}=req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{

        if(err) throw err;

        res.json(info);
    }
    )
}
);

app.post('/post',uploadMiddleware.single('file'),(req, res)=>{

    console.log("body",req.body)
    res.json({files:req.file});
    // res.json('ok')

}
)
app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.listen(4000,()=>{
    console.log('listening on port 4000');
});
// Ag2M7UvZx9JdxY4L

// mongodb+srv://geoffgeorge107:Ag2M7UvZx9JdxY4L@cluster1.r6awora.mongodb.net/?retryWrites=true&w=majority