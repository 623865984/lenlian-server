var express = require('express');
var router = express.Router();
//关联主程序
var driverinfo = require('../api/driverinfo.js');

/* GET home page. */
//进入主页面信息
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


//查所有司机
router.get('/driverAll',function(req,res,next){
	driverinfo.driverAll(req,res,next);
});
//查所有车辆
router.get('/carAll',function(req,res,next){
	driverinfo.carAll(req,res,next);
});


module.exports = router;
