//require library 

const mongoose = require('mongoose');
//connected to the Database(Mongo dB)

mongoose.connect('mongodb://127.0.0.1/BakendData');


//cheak if it is connected or not

const db = mongoose.connection;

//if any kind of error is occured

db.on('error',console.error.bind(console,'Error in connecting the database'));

//If it is successfully Connected to the DataBase

db.once('open',function(){
    console.log("Successfully Connected To the DataBase");
});

module.exports =db;