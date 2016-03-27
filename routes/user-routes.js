var express = require('express'),
    _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken'),
    mongoose= require('mongoose');

var app = module.exports = express.Router();

var User   = require('../models/user-model');

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn:86400 });
}

app.post('/users', function(req, res) {
    var user = new User();
        
    user.username = req.body.username;
    user.password = req.body.password;
    user.admin = req.body.admin;
    user.privileges= req.body.privileges;

    user.save(function(err,user){
        if(err)
            res.send(err);
        res.json({success:true,message:'User created successfully.'});
    });
});

app.post('/sessions/create', function(req, res) {

  User.findOne({
                username:req.body.username
            },function(err,user){
                if(err)
                    res.send(err);
                
                if(!user){
                    res.json({success:false,message:'Authentication failed. User not found.'});
                }else{
                    if (user.password != req.body.password){
                        res.json({success:false,message:'Authentication failed. Wrong password.'});
                    }
                    else{
                        //var token = jwt.sign(user, config.secret, {expiresIn:60});
                        var token = createToken(user);
                        
                        res.json({
                            success: true,
                            message: 'Enjoy your Token!',
                            token: token
                        });
                    }
                }
            });
});