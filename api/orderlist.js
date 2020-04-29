//实现与mysql交互
var mysql=require('mysql');
var $conf=require('../conf/db.js');
var $util=require('../util/util.js');
var $sql=require('./sql/ordersql.js');
var moment = require('moment')
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
	//增加订单
	orderAdd: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
 			var t1 = Date.now();
			var ordertime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
 			console.log(t1);
			console.log(ordertime)
			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.orderinsert, [param.send_user, param.take_user,param.senduser_phone,param.takeuser_phone,param.goodname,param.goodtype,param.send_place,param.take_place,param.ifcold,param.goodv,param.goodm, 0, ordertime], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},
    orderDelete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.query.lno;
            connection.query($sql.orderdelete, id, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
	//修改订单状态
	orderUpdate: function (req, res, next) {
	    // delete by Id
	    pool.getConnection(function(err, connection) {
	        var id = +req.query.lno;
	        connection.query($sql.orderUpdate, id, function(err, result) {
	            if(result) {
	                result = {
	                    code: 200,
	                    msg:'修改成功'
	                };
	            } else {
	                result = void 0;
	            }
	            jsonWrite(res, result);
	            connection.release();
	        });
	    });
	},
    	//得到所有商品 在路由routes调用本方法，这个方法调用sql语句 ，并返回相应结果jsonwrite
	orderAll: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.orderAll, function(err, result) {
				console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

    orderType: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var order_state = +req.query.order_state;
            connection.query($sql.orderState, +req.query.order_state, function(err, result) {
				console.log(result)
				console.log(+req.query.order_state)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
	
};