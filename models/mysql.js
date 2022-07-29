const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
  host: '101.43.129.224',
  user: 'root',
  password: 'ql123456',
  database: 'express_demo_db',
})
mysqlConnection.connect();

module.exports = mysqlConnection;