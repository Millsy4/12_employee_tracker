const mysql = require("mysql");

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

function start() {
  inquirer.prompt({
    name: "initialize",
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Employees", 
    "View All Employees By Department", 
    "View All Employees By Manager", 
    "Add Employee", 
    "Remove Employee", 
    "Update Employee Role", 
    "Update Employee Manager"]
  }).then(function({initialize}) {
    console.log(initialize);
    if(initialize === "View All Employees") {
      
    } else if(initialize === "View All Employees By Department") {

    } else if(initialize === "View All Employees By Manager") {

    } else if(initialize === "Add Employee") {

    } else if(initialize === "Remove Employee") {

    } else if(initialize === "Update Employee Role") {

    } else if(initialize === "Update Employee Manager") {
      
    }
  });
};