//实现与mysql交互
var $sql=require('./sql/usersql.js');
var moment = require('moment');
var md5 = require('md5-node');
const { gopush }=require('../util/goeasy.js');
const { query } = require('../util/async-db');

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
sortId: function (a,b){  
       return a.id-b.id  
    },
//增加消息
msgadd: function (req, res, next) {
	let data
	var param = req.query || req.params
	var ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
	var params = [param.uid,param.tid,param.type,param.msg,ctime]
	var sql = 'INSERT INTO `msg` (`uid`,`tid`,`type`,`msg`,`ctime`) VALUES(?,?,?,?,?)'
	var result = query(sql,params)
	if(result){
		data = {
			code: 0,
			msg:'添加成功'
		};
		gopush('msg','你有一条新的消息')
	}else{
		data = {
			code: 1,
			msg:'添加失败'
		};  
	}
	jsonWrite(res, data)
},
//获取消息
msgget: async function (uid,tid,read,set) {
	let data
	var params = [uid,tid]
	var results
	var sql = 'select * from msg where uid=? and tid=? and hasread=0'
	var sql1 = 'select * from msg where uid=? and tid=? and hasread=1'
	//read为0获取已读消息，否则获取未读消息
	if(read == 0){
		var result1 = await query(sql1,params)
		results = result1
		// console.log(result1)
	}else{
		var result = await query(sql,params)
		//设置为已读
		if(result[0]&&set) {
			var sql1 = 'UPDATE  msg SET hasread=1 where id=?'
			for(var i=0;i<result.length;i++) {
				await query(sql1,result[i].id)
			}
		}
		results = result
		// console.log(result)
	}
	return results
},
//获取所有未读消息(不设置read)
msg_unread_all: async function (req, res, next) {
	let data
	var param = req.query || req.params
	var result
	var sql = 'select * from msg where  tid=? and hasread=0'
	//read为0获取已读消息，否则获取未读消息
	result = await query(sql,param.tid)
	if(result){
		data = {
			code: 0,
			msg:'查询成功',
			data_1: result
		}
	}
	jsonWrite(res, data)
},
//查询未读消息
msg_unread: async function (req, res, next) {
	let data;
	var param = req.query || req.params
	//获取未读消息
	var result = await this.msgget(param.uid,param.tid,1,1)
	if(result){
		data = {
			code: 0,
			msg:'查询成功',
			data_1: result
		};
	}else{
		data = {
			code: 1,
			msg:'没有未读消息'
		};  
	}
	jsonWrite(res, data)
},
//查询所有消息
msgAll: async function (req, res, next) {
	let data;
	var param = req.query || req.params
	//获取已读消息
	var result1 = await this.msgget(param.uid,param.tid,0,0)
	var result2 = await this.msgget(param.tid,param.uid,0,0)
	//获取未读消息
	var result3 = await this.msgget(param.uid,param.tid,1,1)
	var result4 = await this.msgget(param.tid,param.uid,1,0)
	result1 = result1.concat(result2)
	result3 = result3.concat(result1)
	result4 = result4.concat(result3)
	var result5 = result4
	result5.sort(this.sortId)
	console.log(result5)
	data = {
		code: 0,
		msg:'查询成功',
		data_1: result5
	};
	jsonWrite(res, data)
},
//查询聊天列表
msglist_all: async function (req, res, next) {
	let data;
	var param = req.query || req.params
	var sql = 'select DISTINCT(uid) from msg where tid=?'
	var result1 = await query(sql,param.tid)
	var result2 = []
	console.log(result1)
	if(result1){
		for(var i=0;i<result1.length;i++){
			var nick = await this.nicname_face(result1[i].uid,param.type)
			result2.push(nick[0]) 
		}
		console.log(result2)
	}
	data = result2
	jsonWrite(res, data)
},
//查询头像昵称信息
nicname_face: async function (id,type) {
	let data;
	var result
	var sql = 'select uno,nickname,image from user where  uno=? '
	var sql1 = 'select dno,nickname,image from driver where  dno=? '
	if(type == 'isuser'){
		 result = await query(sql1,id)
	}else{
		 result = await query(sql,id)
	}
	return result
},
}