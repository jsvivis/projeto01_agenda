
const mysql = require("mysql");


const sqlConnection = mysql.createConnection({
  host: "localhost",       
  port: 3306,              
  user: "root",           
  password: "",       
  database: "agenda",    
});


module.exports = sqlConnection;