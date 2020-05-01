//实现与mysql交互
var mysql=require('mysql');
var $conf=require('../conf/db.js');
var $util=require('../util/util.js');
var $sql=require('./sql/driversql.js');
var moment = require('moment')
var md5 = require('md5-node');
//使用连接池
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

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
//增加司机
driveradd: function (req, res, next) {
	pool.getConnection(function(err, connection) {
		let data
		var character = "今天工作不努力，明天努力找工作！";
		var imag = "../../static/img/im/face/face_5.jpg";
		var param = req.query || req.params;
		var password = md5(param.password);
		var ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
		var nickname = "会飞的鱼"+ctime
		// 建立连接，向表中插入值
		// 'INSERT INTO driver(id, name, age) VALUES(0,?,?)',
		connection.query($sql.driverinfos, param.phonenumber, function(err, result) {
			console.log(result)
			if(result[0]) {
				data = {
					code: -1,
					msg:'手机号已经存在'
				};
			} else {
				connection.query($sql.driverinsert, [nickname,imag,param.phonenumber,password,character,ctime], function(err, result) {
					if(result) {
						data = {
							code: 200,
							msg:'注册成功'
						};   
					}
					else {
						data = {
							code: -1,
							msg:'注册失败'
						};   
					}
				});
			}
			setTimeout(() => {
				//把操作结果返回给前台页面
				console.log(data);
				jsonWrite(res, data)
			}, 200);
			connection.release();
		});
	});
},
//按手机号查询司机信息
driverinfos: function (req, res, next) {
	let data;
	pool.getConnection(function(err, connection) {
		connection.query($sql.driverinfos, req.query.phonenumber, function(err, result) {
			if(result[0]) {
				data = {
					code: 0,
					msg:'手机号存在',
					data_1: result,
				};
			} else {
				data = {
					code: 0,
					msg:'手机号不存在'
				};
			}
			setTimeout(() => {
				jsonWrite(res, data)
			}, 200);
			connection.release();
		});
	});
},
//司机登录
driverlogin: function (req, res, next) {
	let data
	var param = req.query || req.params;
	pool.getConnection(function(err, connection) {
		connection.query($sql.logincheck, [param.phonenumber,param.password], function(err, result) {
			if(!result[0]) {
				data = {
					code: 0,
					msg:'账号或密码错误'
				};
			} else {
				data = {
					code: 1,
					msg:'登录成功',
					data_1: result[0]
				};
			}
			setTimeout(() => {
				jsonWrite(res, data)
			}, 200);
			connection.release();
		});
	});
},
//查询所有司机信息
driverAll: function (req, res, next) {
	pool.getConnection(function(err, connection) {
		connection.query($sql.driverall, function(err, result) {
			console.log(result)
			jsonWrite(res, result);
			connection.release();
		});
	});
},
//改变工作状态
driverstate: function (req, res, next) {
	pool.getConnection(function(err, connection) {
		let data;
		var param = req.query || req.params;
		var states = ['待调度','工作中'];
		var state
		for (var i=0;i<states.length;i++) {
		   if(param.state == states[i]) {
			   state = states[(i+1)%2];
		   }
		}
		connection.query($sql.driver_state,[state,param.dno], function(err, result) {
			if(result.affectedRows>0) {
				data = {
					code: 0,
					msg:'修改成功',
				};
			} else {
			   data = {
				   code: 1,
				   msg:'修改失败'
			   };
			}
			setTimeout(() => {
				jsonWrite(res, data)
			}, 200);
			connection.release();
		});
	});
},
}