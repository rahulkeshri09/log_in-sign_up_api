const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/foodViram_db');
const db=mongoose.connection;
//check error to open the mongoDB
db.on('error',console.error.bind(console,"Error in connecting to mongoDB"));
//if no error found and mongoDB open successfully
db.once('open',function(){
    console.log('Connect to database : mongoDB');
})
module.exports=db;