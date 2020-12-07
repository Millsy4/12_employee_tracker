const connection = require("./index.js");

function viewAllEmployees() {
  return connection.query(`SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
  FROM employee
  LEFT JOIN role ON employee.role_id=role.id
  LEFT JOIN department ON department_id=department.id
  LEFT JOIN employee AS manager ON employee.manager_id=manager.id
  ORDER BY employee.id;`)
}

module.exports = viewAllEmployees();