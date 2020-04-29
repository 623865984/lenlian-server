var express = require('express');
var router = express.Router();
var userinfo = require('../api/userinfo.js');

//这个路由可以设置用户
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('用户接口');
});

//测试
router.get('/Test',function(req, res, next){
	test.getData();
});

//添加新用户
router.get('/userAdd',function(req,res,next){
	userinfo.useradd(req,res,next);
});
//登录
router.get('/userLogin',function(req,res,next){
	userinfo.userlogin(req,res,next);
});
//按手机查询用户信息
router.get('/userInfos',function(req,res,next){
	userinfo.userinfos(req,res,next);
});
//查询所有用户信息
router.get('/userAll',function(req,res,next){
	userinfo.userAll(req,res,next);
});


module.exports = router;
