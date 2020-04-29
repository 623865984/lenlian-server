var express = require('express');
var router = express.Router();
//关联主程序
var orderlist = require('../api/orderlist.js');

/* GET home page. */
//进入主页面信息
router.get('/', function(req, res, next) {
    res.send('订单接口');
});

//增
router.get('/orderAdd',function(req,res,next){
	orderlist.orderAdd(req,res,next);
});

//删除订单
router.get('/orderDel',function(req,res,next){
	orderlist.orderDelete(req,res,next);
});
//改
router.get('/orderUpdate',function(req,res,next){
	orderlist.orderUpdate(req,res,next);
});
//查寻所有订单
router.get('/orderAll',function(req,res,next){
	orderlist.orderAll(req,res,next);
});
//查询不同状态订单
router.get('/orderType',function(req,res,next){
	orderlist.orderType(req,res,next);
});


module.exports = router;
