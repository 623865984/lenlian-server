var order={
/*
	所有订单   *****************************************************************************
*/	
	
	
	
	
	/*
		超市订单   *****************************************************************************
	*/
	
		//增加订单
		order_user_chaoshi_insert:'INSERT INTO `order_user_chaoshi` (`uno`,`phonenumber`,`name`,`label`,`cityCode`,`detailed`,`ordertype`,`img`,`goodname`,`spec`,`price`,`number`,`deduction`,`note`,`freight`,`ctime`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
		//删除订单
		order_user_chaoshi_delete: 'delete from order_user_chaoshi where id=?',
		//修改订单状态
		order_user_chaoshi_state: 'update order_user_chaoshi SET state=? where id=?',
		//查用户所有订单
		order_user_chaoshi_all: 'select * from order_user_chaoshi where uno=?',
		//查用户不同状态所有订单
		order_user_chaoshi_state_all: 'select * from order_user_chaoshi where uno=? and state=?',
	/*
		提货入库订单   *****************************************************************************
	*/
		//增加订单
		order_user_ruku_insert:'INSERT INTO `order_user_ruku` (`uno`,`phonenumber`,`name`,`label`,`cityCode`,`detailed`,`ordertype`,`img`,`weight`,`goodtype`,`ifcold`,`note`,`trip_price`,`startprice`,`store_label`,`store_detail`,`store_phonenumber`,`deduction`,`ctime`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
		//修改订单状态
		order_user_ruku_state: 'update order_user_ruku SET state=? where id=?',
		//查用户所有订单
		order_user_ruku_all: 'select * from order_user_ruku where uno=?',
		//查用户不同状态所有订单
		order_user_ruku_state_all: 'select * from order_user_ruku where uno=? and state=?',
		
	/*
		提货送货订单   *****************************************************************************
	*/
		//增加订单
		order_user_songhuo_insert:'INSERT INTO `order_user_songhuo` (`uno`,`receive_phonenumber`,`send_phonenumber`,`receive_name`,`send_name`,`receive_label`,`send_label`,`receive_cityCode`,`send_cityCode`,`receive_detailed`,`send_detailed`,`ordertype`,`img`,`weight`,`goodtype`,`ifcold`,`note`,`trip_price`,`startprice`,`deduction`,`ctime`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
		//修改订单状态
		order_user_songhuo_state: 'update order_user_songhuo SET state=? where id=?',
		//查用户所有订单
		order_user_songhuo_all: 'select * from order_user_songhuo where uno=?',
		//查用户不同状态所有订单
		order_user_songhuo_state_all: 'select * from order_user_songhuo where uno=? and state=?',
	/*
		仓库派单订单   *****************************************************************************
	*/
		//增加订单
		order_user_paidan_insert:'INSERT INTO `order_user_paidan` (`uno`,`phonenumber`,`name`,`label`,`cityCode`,`detailed`,`ordertype`,`img`,`weight`,`goodtype`,`ifcold`,`note`,`trip_price`,`startprice`,`store_label`,`store_detail`,`store_phonenumber`,`deduction`,`ctime`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
		//修改订单状态
		order_user_paidan_state: 'update order_user_paidan SET state=? where id=?',
		//查用户所有订单
		order_user_paidan_all: 'select * from order_user_paidan where uno=?',
		//查用户不同状态所有订单
		order_user_paidan_state_all: 'select * from order_user_paidan where uno=? and state=?',
}

module.exports=order;