var passport=require("passport");
var user =require('../controllers/connection');
var localStrategy=require("passport-local").Strategy;

passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(is,function(err,user){
        done(err,user);
    });
});