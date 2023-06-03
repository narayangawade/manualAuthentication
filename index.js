
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8001;
const path = require('path');
 const User = require('./model/user')
const db = require('./config/mongoose');
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views',path.join (__dirname,'views'));

app.use(express.urlencoded());


app.get('/',function(req,res){
    
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,(err,user)=>{
            if(user){
            return    res.render('index.ejs');
            }
            return res.redirect('/signin');
        })
    }else{
        return res.redirect('/signin');

    }
});

app.get('/signup',function(req,res){
    res.render('signup.ejs');
});


//SignUp LOgic
app.post('/create',function(req,res){
    if (req.body.password != req.body.confirm_password){
        console.log("password with confirm password not Match");
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in finding the user in database");
            return;
        }
        if(!user){
        User.create(req.body,(err,user)=>{
            if(err){
                console.log("Error in sining Up the user");
                return;
            }
         return   res.redirect('/signin');
        });
 
        }else{
            console.log("user is alredy exist");
            return res.redirect('/back');
        }
    })
 });

 app.get('/signin',function(req,res){
    res.render('signin');
   });
  
 
//  Sign In Logic

 app.get('/signin',function(req,res){
    res.render('signin');
  });
 
 app.post('/create-session', function(req,res){
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log("Error in loging in the User");
            return;
        }
        if(user){
            if(user.password != req.body.password){
                res.redirect('back');
            }
            res.cookie('user_id', user.id);
            // console.log(cookie);
            return res.redirect('/');
        }else{
            return res.redirect('back');
        }
    })
})

app.post('/signout',(req,res)=>{
    if(req.cookies.user_id){
        res.clearCookie('user_id');
        return res.redirect('/signin');
    }
})
 
 







app.listen(port,(err)=>{
    if(err){
        console.log("Error in running the server on port Number:",port);
        return;
    }
    console.log("server is running fine on port number:",port);
});


