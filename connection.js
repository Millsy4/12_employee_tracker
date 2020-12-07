var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Chieff1!",
    database: "employee_db"
  });
  
  connection.connect(function(err) {
    if(err) throw err;
    start();
  });
  
module.exports = connection;