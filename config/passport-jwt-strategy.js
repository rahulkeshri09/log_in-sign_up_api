const JWTstrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User=require('../model/user');
let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'foodViram'
}
passport.use(new JWTstrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log('Error in finding user from JWT',err);
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))
module.exports=passport;