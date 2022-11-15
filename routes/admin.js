const express = require('express');
const userRouter = express();


userRouter.set('view engine', 'ejs');
userRouter.set('views', './views/admin')

const controller = require('../controller/controller');
const sessionSecret = "mysessionsecret";
const session = require('express-session');
userRouter.use(session({secret:sessionSecret}))



// get api
userRouter.get('/',controller.loadRegister);
// post api
userRouter.post('/',controller.insertData)


// list data
userRouter.get('/list',controller.listData);

// select data
userRouter.get('/update',controller.selectData);
  
// update api
userRouter.post('/update',controller.updateData);



// delete data
userRouter.get('/delete',controller.deleteData);

// login api
userRouter.get('/login',controller.loginLoad);

userRouter.post('/login',controller.login);

userRouter.get('/home',controller.home);

// logout api
userRouter.get('/logout',controller.userLogout);

// categoryapi
userRouter.get('/category',controller.loadcategory);
userRouter.post('/category',controller.category);

// product details api
userRouter.get('/productdetails',controller.productdetail);

// search api
userRouter.get('/search',controller.searchProduct);

module.exports = {userRouter};
