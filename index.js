const express=require('express');
const port=8000;
const db=require('./config/mongoose');
const passport=require('passport');
const passportJWT=require('./config/passport-jwt-strategy');
const app=express();
//parser
app.use(express.urlencoded());
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`server is running on port okk:${port}`);
});