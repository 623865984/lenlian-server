//实现与mysql交互
var mysql=require('mysql');
var $conf=require('../conf/db.js');
var $util=require('../util/util.js');
var $sql=require('./sql/usersql.js');
var moment = require('moment');
// var md5 = require('md5-node');
const { gopush }=require('../util/goeasy.js');
const { query } = require('../util/async-db');
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
		var imag = "/static/img/im/face/face_2.jpg";
		var param = req.query || req.params;
		var password = md5(param.password);
		//生成昵称后缀码
		var range = 50000; //取值范围的差
		var random = Math.random(); //小于1的随机数
		mix = 10000 + Math.round(random * range); //最小数与随机数和取值范围求和，返回想要的随机数字
		var ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
		var nickname = "吴彦祖"+mix;
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
					code: 1,
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

/*   
	地址模块  ******************************************************************************
*/
//增加地址
addressadd: function (req, res, next) {
 pool.getConnection(function(err, connection) {
	let data
	var param = req.query || req.params;
	var ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
	// 建立连接，向表中插入值
	// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
	connection.query($sql.addressAdd, [param.uno, param.phonenumber,param.name,param.value,param.label,param.cityCode,param.detailed,param.isDefault,ctime], function(err, result) {
		if(result.affectedRows>0) {
			data = {
				code: 0,
				msg:'增加成功',
			};    
		}else {
		   data = {
			   code: 1,
			   msg:'增加失败',
		   };
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
//按用户id查询用户地址信息
addressall: function (req, res, next) {
   pool.getConnection(function(err, connection) {
	   let data;
	   var param = req.query || req.params;
	   connection.query($sql.addressAll, param.uno, function(err, result) {
		   if(result[0]) {
			data = {
				code: 0,
				msg:'查询成功',
				data_1: result,
				
			};
				
		   } else {
			   data = {
				   code: 1,
				   msg:'地址不存在'
			   };
		   }
		   setTimeout(() => {
			jsonWrite(res, data)
		   }, 200);
		   connection.release();
	   });
   });
},
//删除地址
addressdel: function(req, res, next) {
       // delete by Id
       pool.getConnection(function(err, connection) {
           let data;
           var param = req.query || req.params;
           connection.query($sql.addressDel, param.id, function(err, result) {
			   console.log(result.affectedRows)
               if(result.affectedRows>0) {
                   data = {
                       code: 0,
                       msg:'删除成功',
                   };
               } else {
                   data = {
                       code: 1,
                       msg:'删除失败',
                   };
               }
               setTimeout(() => {
				 jsonWrite(res, data)
               }, 200);
               connection.release();
           });
       });
   },
//修改地址信息
addressupdate: async function (req, res, next) {
	let data;
	let ok;
	var param = req.query || req.params;
	var sql = 'select id from user_address where uno=? and isDefault=1'
	var before = await query(sql,param.uno)
	ok = await query($sql.addressUpdate,[param.phonenumber,param.name,param.value,param.label,param.cityCode,param.detailed,param.id])
	console.log(ok)
	console.log(before[0])
	if(ok.affectedRows>0){
		data = {
			code: 0,
			msg:'修改成功',
		};  
	}else{
		data = {
			code: 1,
			msg:'修改失败',
		};  
	}
	//已经有默认地址时
	if(before[0]) {
		//isDefault为真时
		if(param.isDefault) {
			console.log(param.isDefault)
			//当前不是默认地址时
			if(param.id != before[0].id) {
				console.log(param.id)
				console.log(before[0].id)
				await this.setdefault(param.id,before[0].id);
			}
		} 
	}
	//没有默认地址
	else {
		await query($sql.setDefault ,[1,param.id])
	}
	
	jsonWrite(res, data)
},
//改变默认收货地址
	setdefault: async function(now,before) {
		await query($sql.setDefault ,[1,now])
		await query($sql.setDefault ,[0,before])
		
	}
}