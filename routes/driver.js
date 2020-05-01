var express = require('express');
var router = express.Router();
//关联主程序
var driverinfo = require('../api/driverinfo.js');

/* GET home page. */
//进入主页面信息
router.get('/', function(req, res, next) {
    res.send('司机接口');
});


//添加新司机
router.get('/driverAdd',function(req,res,next){
	driverinfo.driveradd(req,res,next);
});
//登录
router.get('/driverLogin',function(req,res,next){
	driverinfo.driverlogin(req,res,next);
});
//按手机查询司机信息
router.get('/driverInfos',function(req,res,next){
	driverinfo.driverinfos(req,res,next);
});
//查询所有司机信息
router.get('/driverAll',function(req,res,next){
	driverinfo.driverAll(req,res,next);
});
//改变工作状态
router.get('/driverState',function(req,res,next){
	driverinfo.driverstate(req,res,next);
});



module.exports = router;
