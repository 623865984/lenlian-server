var user={
	/* 
		顾客  *******************************************************************
	*/
	//增
	userinsert:'INSERT INTO `user` (`nickname`,`image`,`phonenumber`,`password`,`character`,`ctime`) VALUES(?,?,?,?,?,?)',
	//查
	userall: 'select * from user',
	userinfos: 'select * from user where phonenumber=?',
	logincheck: 'select * from user where phonenumber=? and password=?',
	/*
		地址  *******************************************************************
	*/
	addressAdd: 'INSERT INTO `user_address` (`uno`,`phonenumber`,`name`,`value`,`label`,`cityCode`,`detailed`,`isDefault`,`ctime`) VALUES(?,?,?,?,?,?,?,?,?)',
	addressDel: 'delete from user_address where id=?',
	addressAll: 'select * from user_address where uno=?',
	addressUpdate: 'UPDATE  user_address SET phonenumber=?,name=?,value=?,label=?,cityCode=?,detailed=? where id=?',
	setDefault: 'UPDATE  user_address SET isDefault=? where id=?',
}
module.exports = user;