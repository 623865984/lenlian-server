// conf/db.js
// MySQL数据库联接配置
// module.exports = {
//     mysql: {
//         host: 'localhost', 
//         user: 'root',
//         password: '11111111',
//         database:'expressdb', // 前面建的user表位于些数据库中
//         port: 3306
//     }
// };
const mysql = require('mysql')
const pool = mysql.createPool({
  host     :  'localhost',
  user     :  'root',
  password :  '11111111',
  database :  'expressdb',
  port: 3306
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }