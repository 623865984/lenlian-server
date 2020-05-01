// conf/db.js
// MySQL数据库联接配置
module.exports = {
    mysql: {
        host: 'localhost', 
        user: 'root',
        password: '11111111',
        database:'expressdb', // 前面建的user表位于些数据库中
        port: 3306,
		multipleStatements: true // 开启同时执行多条SQL
    }
};
