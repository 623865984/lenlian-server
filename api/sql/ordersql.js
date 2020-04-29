var order={
	//增
	orderinsert:'INSERT INTO `custlist` (`send_user`,`take_user`,`senduser_phone`,`takeuser_phone`,`goodname`,`goodtype`,`send_place`,`take_place`,`ifcold`,`goodv`,`goodm`,`order_state`,`listdate`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
	//删
	orderdelete: 'delete from custlist where lno=?',
	//改
	orderUpdate: 'update custlist SET order_state=1 where lno=?',
    //查所有订单
    orderAll: 'select * from custlist',
	//查询不同状态的订单
    orderState: 'select * from custlist where order_state=?',
}

module.exports=order;