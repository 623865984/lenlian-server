var express = require('express');
var router = express.Router();
var msg = require('../api/msglist.js');

//这个路由可以设置信息
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('信息接口');
});


//添加新消息
router.get('/msgAdd',function(req,res,next){
	msg.msgadd(req,res,next);
});

//获取未读消息
router.get('/msgUnread',function(req,res,next){
	msg.msg_unread(req,res,next);
});
//获取所有消息
router.get('/msgAll',function(req,res,next){
	msg.msgAll(req,res,next);
});
//获取所有未读消息(不设置hasread)
router.get('/msg_unread_All',function(req,res,next){
	msg.msg_unread_all(req,res,next);
});
//获取聊天列表
router.get('/msglist_All',function(req,res,next){
	msg.msglist_all(req,res,next);
});
module.exports = router;
