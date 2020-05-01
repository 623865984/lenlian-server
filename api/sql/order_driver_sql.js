var order={
/*
	所有订单   *****************************************************************************
*/	
	
	
	
	
	/*
		订单   *****************************************************************************
	*/
	
		//增加订单
		order_driver_insert:'INSERT INTO `order_driver` (`dno`,`cno`,`ordertype`,`order_user_id`,`ctime`) VALUES(?,?,?,?,?)',
		//删除订单
		order_driver_delete: 'delete from order_driver where id=?',
		//修改订单状态
		order_driver_state: 'update order_driver SET state=? where id=?',
		//查司机所有订单
		order_driver_all: 'select * from order_driver where dno=?',
		//查司机不同状态的订单
		order_driver_state_all: 'select ordertype,order_user_id from order_driver where dno=? and state=?',
	
}

module.exports=order;