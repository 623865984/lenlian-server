//实现与mysql交互
var mysql=require('mysql');
var $conf=require('../conf/db.js');
var $util=require('../util/util.js');
var $sql=require('./sql/order_driver_sql.js');
var moment = require('moment');
var order_user = require('./order_user.js');
const { query } = require('./async-db');
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
	司机   *****************************************************************************
*/	
//增加订单
	order_driver_insert: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			let data
			var param = req.query || req.params;
			var ctime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
			// 建立连接，向表中插入值
			connection.query($sql.order_driver_insert, [param.dno,param.cno,param.ordertype,param.order_user_id,ctime], function(err, result) {
				if(result.affectedRows>0) {
				    data = {
				    	code: 0,
				    	msg:'增加订单成功'
				    };
				}else {
					data = {
						code: 1,
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
	order_driver_state_change: function (req, res, next) {
	   pool.getConnection(function(err, connection) {
		   let data;
		   var param = req.query || req.params;
		   var states = ['进行中','已完成'];
		   var state
		   for (var i=0;i<states.length;i++) {
			   if(param.state == states[i]) {
				   state = states[i+1];
			   }
		   }
		   connection.query($sql.order_driver_state, [state,param.id], function(err, result) {
			   console.log(result)
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
//同步查询司机不同状态所有订单
	order_driver_state_select: async function (req, res, next) {
	  var param = req.query || req.params;
	  let list = [];
	  let data;
	  let driver_data = await query($sql.order_driver_state_all ,[param.dno,param.state]);
	     for (var i=0;i<driver_data.length;i++) {
			list.push(await order_user.order_type_select(driver_data[i].ordertype,driver_data[i].order_user_id));
		  }
	  if(list.length>0) {
		data = {
			code: 0,
			msg:'查询成功',
			data_1: list
		};
	  } else {
		   data = {
			   code: 1,
			   msg:'查询失败'
		   };
	  }
	  jsonWrite(res, data)
	},
};