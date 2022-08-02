const mysql = require("mysql2");
const mysqlConnection = mysql.createConnection({
  host: "101.43.129.224",
  port: 3306,
  user: "root",
  password: "ql123456",
  database: "express_mysql_demo",
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.log("error!");
    console.log(err);
    throw err;
  }
  console.log("Connected!");
});

module.exports = mysqlConnection;
