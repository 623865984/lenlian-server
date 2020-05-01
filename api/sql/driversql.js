var driver={
	//增加司机
	driverinsert:'INSERT INTO `driver` (`nickname`,`image`,`phonenumber`,`password`,`character`,`ctime`) VALUES(?,?,?,?,?,?)',
	//查
	driverall: 'select * from driver',
	driverinfos: 'select * from driver where phonenumber=?',
	logincheck: 'select * from driver where phonenumber=? and password=?',
	//修改
	driver_state: 'update driver SET state=? where dno=?',
}

module.exports=driver;