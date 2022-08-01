const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
  host: '101.43.129.224',
  port: 3306,
  user: 'root',
  password: 'ql123456',
  database: 'express_mysql_demo',
})

mysqlConnection.connect();

module.exports = mysqlConnection;