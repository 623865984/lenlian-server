var user={
	/* 顾客 */
	//增
	userinsert:'INSERT INTO `user` (`nickname`,`image`,`phonenumber`,`password`,`character`,`ctime`) VALUES(?,?,?,?,?,?)',
	//查
	userall: 'select * from user',
	userinfos: 'select * from user where phonenumber=?',
	logincheck: 'select * from user where phonenumber=? and password=?',
	/* 地址  */
	addressAdd: 'INSERT INTO `user_address` (`uno`,`phonenumber`,`name`,`label`,`cityCode`,`detailed`,`isDefault`,`ctime`) VALUES(?,?,?,?,?,?,?,?)',
	addressDel: 'delete from user_address where id=?',
	addressAll: 'select * from user_address where uno=?'
}
module.exports = user;