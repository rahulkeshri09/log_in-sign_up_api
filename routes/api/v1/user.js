const express=require('express');
const router=express.Router();
const passport=require('passport');
//user controller
const user=require('../../../controllers/api/v1/userAPI');
//user sign up route
router.post('/sign-up',user.signUP);
//user log in route
router.post('/log-in',user.logIN);
//user get profile details route
router.get('/profile/:id',passport.authenticate('jwt',{session:false}),user.profile);
//user changing pwd route
router.post('/changePassword/:id',passport.authenticate('jwt',{session:false}),user.changePassword);
module.exports=router;