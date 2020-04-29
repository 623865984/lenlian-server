var user={
	/* 顾客 */
	//增
	userinsert:'INSERT INTO `user` (`nickname`,`image`,`phonenumber`,`password`,`character`,`ctime`) VALUES(?,?,?,?,?,?)',
	//查
	userall: 'select * from user',
	userinfos: 'select * from user where phonenumber=?',
	logincheck: 'select * from user where phonenumber=? and password=?',
	
}
module.exports = user;