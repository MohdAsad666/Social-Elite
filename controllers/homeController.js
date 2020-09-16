const User = require('../models/user_schema');
module.exports.homepage = function(req,res)
{
    return res.render("homepage.ejs");
}
module.exports.signUp = function(req,res)
{
    return res.render("sign-up.ejs");
}
module.exports.signIn = function(req,res)
{
    return res.render("sign-in.ejs");
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
                return res.redirect('/sign-in');
            });
        }
        else{
            return res.redirect('/sign-in');
        }


    });
    
}
module.exports.createSession = function(req,res)
{
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log("Error in signing in");
            return;
        }
        if(!user)
        {
            console.log("User Exist try signing UP");
            return res.redirect('/sign-UP');
        }
        if(user.password!=req.body.password)
        {
            console.log("Invalid UserName/Password");
            return res.redirect('back');
        }
        console.log("user-signed in");
        return res.redirect("/");
    });
}