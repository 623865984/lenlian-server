var driver={
	//增
	driverinsert:'INSERT INTO `driver` (`username`,`pwd`,`lisence_type`,`drivername`,`creditnum`,`phonenum`,`nowplace`,`entry_date`) VALUES(?,?,?,?,?,?,?,?)',
	//删
	driverdelete: 'delete from driver where id=?',
	//改
	driverupdate:'UPDATE `driver` SET `username`=?,`drivername`=?,`creditnum`=?,`phonenum`=? WHERE `id`=?',
    //查
    driverAll: 'select * from driver',
    driverById: 'select * from driver where id=?',
	
	/* 车辆信息 */
	carAll: 'select * from carinfo',
}

module.exports=driver;