const mysql = require("mysql");
const inquirer = require("inquirer");
// const employeeQueries = require("./employeeQueries");

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
    "View All Roles",
    "View All Departments",
    "View All Employees By Department", 
    "View All Employees By Manager", 
    "Add Employee", 
    "Add Role",
    "Add Department",
    "Update Employee Role"]
  }).then(function({initialize}) {
    console.log(initialize);
    if(initialize === "View All Employees") {
      let query = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id=role.id
      LEFT JOIN department ON department_id=department.id
      LEFT JOIN employee AS manager ON employee.manager_id=manager.id
      ORDER BY employee.id;`;
      connection.query(query, function(err, res){
        if(err) throw err;
        console.table(res);
        start();
      });
    } else if(initialize === "View All Roles") {
      let query = `SELECT title, salary, department.name as department
      FROM role
      LEFT JOIN department ON role.department_id=department.id`;
      connection.query(query, function(err, res) {
        if(err) throw err;
        console.table(res);
        start();
      });
    } else if(initialize === "View All Departments") {
      let query = `SELECT name AS department FROM department`;
      connection.query(query, function(err, res) {
        if(err) throw err;
        console.table(res);
        start();
      });
    } else if(initialize === "View All Employees By Department") {
      let query = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id=role.id
      LEFT JOIN department ON department_id=department.id
      LEFT JOIN employee AS manager ON employee.manager_id=manager.id
      ORDER BY department.name;`;
      connection.query(query, function(err, res) {
        if(err) throw err;
        console.table(res);
        start();
      });

    } else if(initialize === "View All Employees By Manager") {
      let query = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id=role.id
      LEFT JOIN department ON department_id=department.id
      LEFT JOIN employee AS manager ON employee.manager_id=manager.id
      ORDER BY manager.id;`;
      connection.query(query, function(err, res) {
        if(err) throw err;
        console.table(res);
        start();
      });
    } else if(initialize === "Add Employee") {
      let roles = [];
      let managers = [];
      let query = `SELECT title, salary, department.name as department
      FROM role
      LEFT JOIN department ON role.department_id=department.id`
      connection.query(query, function(err, res) {
        if(err) throw err;
        res.forEach(role => {
          roles.push(role.title);
        });
      query = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id=role.id
      LEFT JOIN department ON department_id=department.id
      LEFT JOIN employee AS manager ON employee.manager_id=manager.id
      ORDER BY manager.id;`;
      connection.query(query, function(err, res) {
        if(err) throw err;
        console.log(res)
      });

        inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the first name of the employee?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the last name of the employee?",
        },
        {
          name: "role",
          type: "list",
          message: "What is the role of the employee?",
          choices: roles
        },
        {
          name: "manager",
          type: "list",
          message: "Who is their manager?",
          choices: managers
        }
        ]).then(function( {firstName, lastName, role} ) {
          console.log(firstName);
          console.log(lastName);
          console.log(role);
        });
        // query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        // VALUES (?, ?, ?, ?)`;
        // connection.query(query, )
      });

    } else if(initialize === "Add Role") {

    } else if(initialize === "Add Department") {

    } else if(initialize === "Update Employee Role") {

    }
    // else if(initialize === "Remove Employee") {
    // }
    // else if(initialize === "Remove Department") {
    // }
    // else if(initialize === "Remove Role") {
    // }
    // else if(initialize === "Update Employee Manager") {
    // }
  });
};

module.exports = connection;