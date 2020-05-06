var express = require('express');
var router = express.Router();
//关联主程序
var order_user = require('../api/order_user.js');
var order_driver = require('../api/order_driver.js');
/* GET home page. */
//进入主页面信息
router.get('/', function(req, res, next) {
    res.send('订单接口');
});

/*
	用户订单   **************************************************
*/

//增加订单--超市
router.get('/order_user_chaoshi_Add',function(req,res,next){
	order_user.order_user_chaoshi_insert(req,res,next);
});
//增加订单--提货入库
router.get('/order_user_ruku_Add',function(req,res,next){
	order_user.order_user_ruku_insert(req,res,next);
});
//增加订单--提货送货
router.get('/order_user_songhuo_Add',function(req,res,next){
	order_user.order_user_songhuo_insert(req,res,next);
});
//增加订单--仓库派单
router.get('/order_user_paidan_Add',function(req,res,next){
	order_user.order_user_paidan_insert(req,res,next);
});
//修改订单状态
router.get('/order_user_state_Change',function(req,res,next){
	order_user.order_user_state_change(req,res,next);
});
//查询不同状态的所有订单
router.get('/order_user_state_Select',function(req,res,next){
	order_user.order_user_state_select(req,res,next);
});
//查询待付款状态的订单
router.get('/order_state_Id',function(req,res,next){
	order_user.order_state_id(req,res,next);
});

/*
	司机订单   **************************************************
*/
//增加订单
router.get('/order_driver_Add',function(req,res,next){
	order_driver.order_driver_insert(req,res,next);
});

//修改订单状态
router.get('/order_driver_state_Change',function(req,res,next){
	order_driver.order_driver_state_change(req,res,next);
});
//查询不同状态的所有订单
router.get('/order_driver_state_Select',function(req,res,next){
	order_driver.order_driver_state_select(req,res,next);
});


module.exports = router;
