var express = require('express');

var router = express.Router();

var User = require('../models/User');

var responseData;

router.use(function(req, res, next) {

    responseData = {
        code: 0,
        message: ''
    };

    next();
});


router.get('/user', function(req, res, next) {
    res.send('<h1>API - User</h1><p>ssss</p>');
});


router.post('/user/register', function(req, res, next) {
    /*
    	1. 用户名不能为空
    	2. 密码不能为空
    	3. 密码跟确认密码要一致

    	1. 用户名不能已经存在于数据库中
    */
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    if (username == "") {
        responseData.code = 1;
        responseData.message = "用户名不能为空";
        res.json(responseData);
        return;
    }
    if (password == "") {
        responseData.code = 2;
        responseData.message = "密码不能为空";
        res.json(responseData);
        return;
    }

    if (repassword != password) {
        responseData.code = 3;
        responseData.message = "密码跟确认密码要一致";
        res.json(responseData);
        return;
    }

    User.findOne({
        username: username
    }).then(function(userInfo) {
        if (userInfo) {
            responseData.code = 4;
            responseData.message = "用户名已经存在于数据库中";
            res.json(responseData);
            return;
        }
        //保存用户注册的信息到数据库中
        var user = new User({
            username: username,
            password: password
        });
        return user.save();
    }).then(function(newUserInfo) {
        responseData.message = "注册成功";
        res.json(responseData);
    });
});

router.post('/user/login', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    if(username == '' || password == ''){
        responseData.code = 5;
        responseData.message = '用户名或密码不能为空'
        res.json(responseData);
        return;
    }

    User.findOne({
        username: username,
        password: password
    }).then(function(userInfo){
        console.log(userInfo);
        if(!userInfo){
            responseData.code = 6;
            responseData.message = '用户名或密码不正确';
            res.json(responseData);
            return;
        }

        responseData.message = '登录成功';
        responseData.userInfo = {
            id: userInfo._id,
            username: userInfo.username
        };
        res.json(responseData);
    })
});

module.exports = router;