const express = require('express');
const User = require("../models/user_schema");

// module.exports.profile = function(req,res)
// {

// }

module.exports.signUp = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    else{
    return res.render("sign-up.ejs");
    }
}
module.exports.signIn = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/');
    }
    else
    {
    return res.render("sign-in.ejs");
    }
}
module.exports.destroySession = function(req,res)
{
    req.logout();
    return res.redirect('/');
}
module.exports.create = function(req,res)
{
    // console.log(req.body.email);
    
    if(req.body.password!=req.body.confirm_pasword)
    {
        return res.redirect("/");
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log("Error in creating account");
            return;
        }
        
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log("Error in Creating Account:: ",err);
                    return;
                }
                return res.redirect('/user/sign-in');
            });
        }
        else{
            console.log("User Exist In DB try Sign-in");
            return res.redirect('/user/sign-in');
        }

    });
    
}
module.exports.createSession = function(req,res)
{
    return res.redirect('/');
}