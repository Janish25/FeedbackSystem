const express= require('express');

const bodyparser = require('body-parser');

const app = express();

const path = require('path');

const mongoose= require('mongoose');


// Db connection
mongoose.connect('mongodb://127.0.0.1:27017/feedback',{useNewUrlParser:true,useUnifiedTopology:true})

// creating Scheme
const Feedbackschema = new mongoose.Schema({
    username : {
        type:String

    },
    Department :{
        type:String
    },
    Comments :{
        type:String
    }
})

// converting scheme into model!
const Feedbackmodel = mongoose.model('feedback',Feedbackschema)

app.use('/static', express.static(path.join(__dirname, 'public'), { "extensions": ["css"], "index": false }));



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.set('view engine','ejs');

app.get('/',(req,res)=>{

    res.render('login',{title : 'login page' ,error:""})

});

const Credentials = {
    email : 'jani@gmail.com',
    password : '123'
}

app.post('/',(req,res)=>{

const email = req.body.email;
const password = req.body.password;


if (email==Credentials.email && password== Credentials.password){
    res.redirect('/feedback')
          
}
else{
    res.render('login',{title : 'login page',error:"Invalid Email address"})
}

})

app.get('/success',(res,req)=>{
    res.render('success')
})
app.get('/feedback',(req,res)=>{

    res.render('Feedback-form')

});

app.post('/feedback',async(req,res)=>{

   const username = req.body.username;
   const Department = req.body.Dept;
   const Comments = req.body.comments;
   console.log(username)
   const store= new Feedbackmodel({
    username:username,
    Department:Department,
    Comments:Comments
   })

   await store.save();

   res.render('success');


});






const port = process.env.PORT||8000;
app.listen(port,()=>{
    console.log("Running on Port 8000")
})



