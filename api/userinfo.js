//实现与mysql交互
var mysql=require('mysql');
var $conf=require('../conf/db.js');
var $util=require('../util/util.js');
var $sql=require('./sql/usersql.js');
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
	//增加用户
	useradd: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			let data
			var character = "开心每一天！";
			var imag = "22";
			var param = req.query || req.params;
			var password = md5(param.password);
			var t1 = Date.now();
			var ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
			var nickname = "吴彦祖"+ctime
			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.userinfos, param.phonenumber, function(err, result) {
			    if(result[0]) {
			        data = {
			        	code: -1,
			        	msg:'手机号已经存在'
			        };
			    } else {
					connection.query($sql.userinsert, [nickname,imag,param.phonenumber,password,character,ctime], function(err, result) {
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
	//按手机号查询用户信息
	userinfos: function (req, res, next) {
		let data;
	    pool.getConnection(function(err, connection) {
	        connection.query($sql.userinfos, req.query.phonenumber, function(err, result) {
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
	//用户登录
	userlogin: function (req, res, next) {
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
	//查询所有用户信息
	userAll: function (req, res, next) {
	    pool.getConnection(function(err, connection) {
	        connection.query($sql.userall, function(err, result) {
				console.log(result)
	            jsonWrite(res, result);
	            connection.release();
	        });
	    });
	},
}