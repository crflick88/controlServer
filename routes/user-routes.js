var express = require('express'),
    _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken'),
    mongoose= require('mongoose');
    exjwt     = require('express-jwt');

var app = module.exports = express.Router();

var User   = require('../models/user-model');

function createToken(user) {
    
    var payload = {
        "user":user.username, 
        "admin":user.admin, 
        "privileges":user.privileges
    };
    
    
    return jwt.sign(payload, config.secret, { expiresIn:86400 });
  //return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn:86400 });
}

var jwtCheck = exjwt({
  secret: config.secret
});

//app.use('/users', jwtCheck);

app.get('/users',function(req,res){
    var user = new User();
    
    User.find(function(err,users){
                if (err)
                    res.send(err);
                
                res.json(users);
            });
    
});

app.post('/users', function(req, res) {
    var user = new User();
        
    user.username = req.body.username;
    user.password = req.body.password;
    user.admin = req.body.admin;
    user.privileges= req.body.privileges;
    
    
    if (!user.username || !user.password) 
        return res.status(400).send("You must send the username and the password");
    else{
       User.findOne({
                username:req.body.username
            },function(err,userFound){
                //if(err)
                    //return res.status(404).send(err);
                    
                if(userFound)
                    return res.status(400).send("A user with that username already exists.");
                else{
                    user.save(function(err,user){
                        if(err)
                            return res.status(404).send(err);
                            else{
                                return res.status(201).send({success:true,message:'User created successfully.',id_token:createToken(user)});   
                            }
                    });
                }
            }); 
    }
 app.get('/users')   
});
/*
//Middleware for users/id
app.use('users/:user_id',function(req,res,next){
    // use our user model to find the user we want
    User.findById(req.params.user_id,function(err,user){
        if(err)
            res.status(500).send(err);
        else if(user){
            req.user = user;
            
            next();
        }else
            res.status(404).send('No users found.');
        
    });
    
});
*/
app.get('/users/:user_id',function(req,res){
    
    User.findById(req.params.user_id,function(err,user){
        if(err)
            res.status(500).send(err);
        else if(user){
            //req.user = user;
            
            res.status(200).json(user);
        }else
            res.status(404).send('No users found.');
        
    });
    
});

app.post('/sessions/create', function(req, res) {
    //return res.status(401).send("req~  username: "+req.body.username + " email: "+req.body.email+" pass: "+req.body.password);
    if (!req.body.email || !req.body.password){ 
    //if (!req.body.username || !req.body.password) {
        res.status(400).send("You must send the username and the password");    
    }
    else
    {
      User.findOne({
                username:req.body.email
                //username:req.body.username
            },function(err,user){
                if(err)
                    return res.status(404).send(err);
                else{
                    if(!user){
                        var msg = req.body.email;
                        return res.status(401).send({success:false,message:"The username or password don't match 1.", username: msg});
                    }else{
                        if (user.password != req.body.password){
                            return res.status(401).send({success:false,message:"The username or password don't match 2.", user: this.user});
                        }
                        else{
                            //var token = jwt.sign(user, config.secret, {expiresIn:60});
                            
                            return res.status(201).send({
                                success: true,
                                message: 'Enjoy your Token!',
                                id_token: createToken(user)
                            });
                        }
                    }   
                }
                
            });  
    }
    
});