const express = require('express');
const app = express();
const con = require('./config/config');
const path = require('path')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if(con){
    console.log('database is connected');
}
else{
    console.log('db connection error');
}

// for register api
const adminRouter = require('./routes/admin')
app.use('/',adminRouter.userRouter)
app.listen(4200,()=>{
    console.log('server is running at port 4200');
});
console.log('program run');