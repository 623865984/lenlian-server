//实现与mysql交互
var mysql=require('mysql');
var $conf=require('../conf/db.js');
var $util=require('../util/util.js');
var $sql=require('./sql/order_user_sql.js');
var moment = require('moment');
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
/*
	用户   *****************************************************************************
*/	
//增加订单--超市
	order_user_chaoshi_insert: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			let data
			var param = req.query || req.params;
			var ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
			// 建立连接，向表中插入值
			connection.query($sql.order_user_chaoshi_insert, [param.uno,param.phonenumber,param.name,param.label,param.cityCode,param.detailed,param.ordertype,param.img,param.goodname,param.spec,param.price,param.number,param.deduction,param.note,param.freight,ctime], function(err, result) {
				if(result.affectedRows>0) {
				    data = {
				    	code: 0,
				    	msg:'增加订单成功'
				    };
				}else {
					data = {
						code: -1,
						msg:'增加订单失败'
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
//增加订单--提货入库
	order_user_ruku_insert: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			let data
			var param = req.query || req.params;
			var ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
			// 建立连接，向表中插入值
			connection.query($sql.order_user_ruku_insert, [param.uno,param.phonenumber,param.name,param.label,param.cityCode,param.detailed,param.ordertype,param.img,param.weight,param.goodtype,param.ifcold,param.note,param.trip_price,param.startprice,param.store_label,param.store_detail,param.store_phonenumber,param.deduction,ctime], function(err, result) {
				if(result.affectedRows>0) {
				    data = {
				    	code: 0,
				    	msg:'增加订单成功'
				    };
				}else {
					data = {
						code: -1,
						msg:'增加订单失败'
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
//增加订单--提货送货
	order_user_songhuo_insert: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			let data
			var param = req.query || req.params;
			var ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
			// 建立连接，向表中插入值
			connection.query($sql.order_user_songhuo_insert, [param.uno,param.receive_phonenumber,param.send_phonenumber,param.receive_name,param.send_name,param.receive_label,param.send_label,param.receive_cityCode,param.send_cityCode,param.receive_detailed,param.send_detailed,param.ordertype,param.img,param.weight,param.goodtype,param.ifcold,param.note,param.trip_price,param.startprice,param.deduction,ctime], function(err, result) {
				if(result.affectedRows>0) {
				    data = {
				    	code: 0,
				    	msg:'增加订单成功'
				    };
				}else {
					data = {
						code: -1,
						msg:'增加订单失败'
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
//增加订单--仓库派单
	order_user_paidan_insert: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			let data
			var param = req.query || req.params;
			var ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
			// 建立连接，向表中插入值
			connection.query($sql.order_user_paidan_insert, [param.uno,param.phonenumber,param.name,param.label,param.cityCode,param.detailed,param.ordertype,param.img,param.weight,param.goodtype,param.ifcold,param.note,param.trip_price,param.startprice,param.store_label,param.store_detail,param.store_phonenumber,param.deduction,ctime], function(err, result) {
				if(result.affectedRows>0) {
				    data = {
				    	code: 0,
				    	msg:'增加订单成功'
				    };
				}else {
					data = {
						code: -1,
						msg:'增加订单失败'
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
//修改订单状态
	order_user_state_change: function (req, res, next) {
	   pool.getConnection(function(err, connection) {
		   let data = {};
		   var param = req.query || req.params;
		   var sql;
		   var states = ['待付款','待发货','待收货','待评价','已完成'];
		   var state
		   if(param.ordertype == '超市') {
			   sql = $sql.order_user_chaoshi_state;
		   }else if(param.ordertype == '提货入库') {
			   sql = $sql.order_user_ruku_state;
		   }else if(param.ordertype == '提货送货') {
			   sql = $sql.order_user_songhuo_state;
		   }else if(param.ordertype == '仓库派单') {
			   sql = $sql.order_user_paidan_state;
		   }else {
			   sql = '';
		   }
		   for (var i=0;i<states.length;i++) {
			   if(param.state == states[i]) {
				   state = states[i+1];
			   }
		   }
		   connection.query(sql, [state,param.id], function(err, result) {
			   console.log(result)
			   if(result) {
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
			   }
			   setTimeout(() => {
				jsonWrite(res, data)
			   }, 200);
			   connection.release();
		   });
	   });
	},
//查询用户不同状态所有订单
    order_user_state_select: function (req, res, next) {
    	let data;
		var param = req.query || req.params;
		var params = [param.uno,param.state,param.uno,param.state,param.uno,param.state,param.uno,param.state];
		var sqlchaoshi = $sql.order_user_chaoshi_state_all;
		var sqlruku = $sql.order_user_ruku_state_all;
		var sqlsonghuo = $sql.order_user_songhuo_state_all;
		var sqlpaidan = $sql.order_user_paidan_state_all;
		var sql = sqlchaoshi +';'+ sqlruku+';'+ sqlsonghuo+';'+ sqlpaidan;
    	pool.getConnection(function(err, connection) {
    		connection.query(sql, params, function(err, result) {
				if(err){
				  	throw err;
				  }else{
				  	if(result[0]) {
				  		data = {
				  			code: 0,
				  			msg:'查询成功',
				  			data_1: result,
				  		};
				  	} else {
				  		data = {
				  			code: 1,
				  			msg:'查询失败'
				  		};
				  	}
				  	setTimeout(() => {
				  		jsonWrite(res, data)
				  	}, 200);
				  	connection.release();
				  }
    			
    		});
    	});
    },
// 根据订单号查询所有类型的订单
	order_type_select: async function (ordertype,order_user_id) {
		let data;
		var sql ;
		var sqlchaoshi = 'select * from order_user_chaoshi where id=?';
		var sqlruku = 'select * from order_user_ruku where id=?';
		var sqlsonghuo = 'select * from order_user_songhuo where id=?';
		var sqlpaidan = 'select * from order_user_paidan where id=?';
		var sqls = [sqlchaoshi,sqlruku,sqlsonghuo,sqlpaidan];
		var tables = ['超市','提货入库','提货送货','仓库派单']
		for(var i=0;i<tables.length;i++) {
			if(ordertype == tables[i]) {
				sql = sqls[i];
			}
		}
		let dataList = await query(sql ,order_user_id)
		// console.log(dataList)
		return dataList
	},
// 查询待付款状态订单信息
	order_state_id: async function (req, res, next) {
		let data;
		let daifu;
		var sql ;
		var param = req.query || req.params;
		console.log(param.ordertype)
		console.log(param.uno)
		var sqlchaoshi = 'select id,state,ordertype from order_user_chaoshi where state="待付款" and uno=? ';
		var sqlruku = 'select id,state,ordertype from order_user_ruku where state="待付款" and uno=?';
		var sqlsonghuo = 'select id,state,ordertype from order_user_songhuo where state="待付款" and uno=?';
		var sqlpaidan = 'select id,state,ordertype from order_user_paidan where state="待付款" and uno=?';
		var sqls = [sqlchaoshi,sqlruku,sqlsonghuo,sqlpaidan];
		var tables = ['超市','提货入库','提货送货','仓库派单']
		for(var i=0;i<tables.length;i++) {
			if(param.ordertype == tables[i]) {
				sql = sqls[i];
			}
		}
		daifu = await query(sql,param.uno)
		console.log(daifu)
		data = {
			msg: '查询成功',
			data_1: daifu
		}
		jsonWrite(res, data)
	}
};