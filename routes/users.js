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
/*   
	地址模块  *********************************
*/
//添加地址
router.get('/addressAdd',function(req,res,next){
	userinfo.addressadd(req,res,next);
});
//查询用户地址信息
router.get('/addressAll',function(req,res,next){
	userinfo.addressall(req,res,next);
});
//删除地址
router.get('/addressDel',function(req,res,next){
	userinfo.addressdel(req,res,next);
});
//修改地址信息
router.get('/addressUpdate',function(req,res,next){
	userinfo.addressupdate(req,res,next);
});
module.exports = router;
