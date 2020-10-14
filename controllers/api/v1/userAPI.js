const User=require('../../../model/user');
const jwt=require('jsonwebtoken');
//sign up action
module.exports.signUP=async function(req,res){
    try{
        //find existing user
        let user=await User.findOne({email:req.body.email});
        //if user not found create new user
        if(!user){
            User.create(req.body);
            return res.json(200,{
                message:"user new id created successful",
                name:req.body.name,
                email:req.body.email
            });
        }
        //if user already exists
        return res.json(200,{
            message:"user already exists",
            name:req.body.name
        })
    }catch(err){
        console.log('ineternal server error');
        return res.json(500,{
            message:"internal server error"
        });
    }
}
//user log in action
module.exports.logIN=async function(req,res){
    try{
        //find existing user
        let user=await User.findOne({email:req.body.email});
        //if user not found or password wrong
        if(!user || user.password != req.body.password){
            return res.json(401,{
                message:"invalid user name or password"
            });
        }
        // if user exists and password is correct
        return res.json(200,{
            message:"log in successfully here is your token",
            data:{
                token:jwt.sign(user.toJSON(), 'foodViram' , {expiresIn:'10000000'}),
                userID:user._id
            }
        })
    }catch(err){
        console.log('ineternal server error ::USER login',err);
        return res.json(500,{
            message:"internal server error"
        })
    }
}
// get profile of user action
module.exports.profile=async function(req,res){
    try{
        //find existing user
        const user=await User.findById(req.params.id);
        //if user found then response their details
        if(user){
            return res.json(200,{
                message:"succefully get user details",
                user:{
                    name:user.name,
                    email:user.email
                }
            })
        }
        //if user not found
        return res.json(404,{
            message:"check user"
        })
    }catch(err){
        console.log('ineternal server error ::USER login',err);
        return res.json(500,{
            message:"internal server error"
        })
    }
}
module.exports.changePassword=async function(req,res){
    try{
        //find existing user
        const user=await User.findOne({email:req.body.email});
        //if user exists 
        if(user){
            // if old password not matched then not change the password
            if(user.password!=req.body.password){
                return res.json(400,{
                    message:"plz type correct password "
                })
            }
            // if old password matched then change the password
            User.findByIdAndUpdate(req.params.id,{password:req.body.newPassword},function(err,user){
                if(err){
                    console.log("error hai ji");
                    return;
                }
                return res.json(200,{
                    message:"password successfully changed"
                })
            });
        }
    }catch(err){
        console.log('ineternal server error ::USER login',err);
        return res.json(500,{
            message:"internal server error"
        })
    }
}