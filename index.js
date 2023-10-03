
const mysql = require('mysql2');
const inquirer = require('inquirer');
// Read the SQL schema file


// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_db',
});


const jobMenu = [
  {
    name: 'joblist',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add department',
      'Add role',
      'Add employee',
      'Update role for employee',
      'QUIT',
    ],
  },
];
function promptMainMenu() {
inquirer
  .prompt(jobMenu)
  .then((response) => {
    if (response.joblist === 'View all departments') {
      viewDepartments();
    } else if (response.joblist === 'View all roles') {
      viewRoles();
    } else if (response.joblist === 'View all employees') {
      viewEmployees();
    } else if (response.joblist === 'Add department') {
      createDepartment();
    } else if (response.joblist === 'Add role') {
      createRole();
    } else if (response.joblist === 'Add employee') {
      createEmployee();
    } else if (response.joblist === 'Update role for employee') {
      updateRole();
    } else if (response.joblist === 'QUIT') {
      process.exit();
    }
  })
  .catch((err) => {
    console.error(err);
  });
};





    function viewDepartments() {
        const query = "SELECT * FROM department";
        db.query(query, (err, rows) => {
          if (err) throw err;
          console.table(rows);
          promptMainMenu();
        });
      }
      
      function viewRoles() {
        const query = "SELECT * FROM role";
        db.query(query, (err, rows) => {
          if (err) throw err;
          console.table(rows);
          promptMainMenu();
        });
      }

      function viewEmployees() {
        const query = "SELECT * FROM employee";
        db.query(query, (err, rows) => {
          if (err) throw err;
          console.table(rows);
          promptMainMenu();
        });
      }

      function createDepartment() {
        inquirer
          .prompt([
            {
              name: "name",
              type: "input",
              message: "Enter the department name:",
            },
          ])
          .then((answer) => {
            const query = "INSERT INTO department (name) VALUES (?)";
            db.query(query, [answer.name], (err, _result) => {
              if (err) throw err;
              console.log(`Department ${answer.name} added.`);
              promptMainMenu();
            });
          });
      }

      function createRole() {
        inquirer
          .prompt([
            {
              name: "title",
              type: "input",
              message: "Enter the role title:",
            },
            {
              name: "salary",
              type: "input",
              message: "Enter the role salary:",
            },
            {
              name: "department_id",
              type: "input",
              message: "Enter the department ID for this role:",
            },
          ])
          .then((answer) => {
            const query =
              "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
            db.query(
              query,
              [answer.title, answer.salary, answer.department_id],
              (err, _result) => {
                if (err) throw err;
                console.log(`Role ${answer.title} added.`);
                promptMainMenu();
              }
            );
          });
      }

      function createEmployee() {
        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "Enter the employee's first name:",
            },
            {
              name: "last_name",
              type: "input",
              message: "Enter the employee's last name:",
            },
            {
              name: "role_id",
              type: "input",
              message: "Enter the role ID for this employee:",
            },
            {
              name: "manager_id",
              type: "input",
              message: "Enter the manager's ID for this employee (optional):",
            },
          ])
          .then((answer) => {
            const query =
              "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            db.query(
              query,
              [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
              (err, _result) => {
                if (err) throw err;
                console.log(`Employee ${answer.first_name} ${answer.last_name} added.`);
                promptMainMenu();
              }
            );
          });
      }
      
      function updateRole() {
        // Prompt the user to select an employee and choose a new role
        inquirer
          .prompt([
            {
              name: "employee_id",
              type: "input",
              message: "Enter the ID of the employee you want to update:",
            },
            {
              name: "new_role_id",
              type: "input",
              message: "Enter the ID of the new role for the employee:",
            },
          ])
          .then((answer) => {
            const employeeId = parseInt(answer.employee_id);
            const newRoleId = parseInt(answer.new_role_id);
      
            // Check if the employee ID and role ID are valid numbers
            if (isNaN(employeeId) || isNaN(newRoleId)) {
              console.log("Please enter valid employee and role IDs.");
              return promptMainMenu();
            }
      
            // Update the employee's role in the database
            const query = "UPDATE employee SET role_id = ? WHERE id = ?";
            db.query(query, [newRoleId, employeeId], (err, result) => {
              if (err) throw err;
      
              if (result.affectedRows === 0) {
                console.log("Employee not found or role not updated.");
              } else {
                console.log("Employee role updated successfully.");
              }
      
              // Return to the main menu
              promptMainMenu();
            });
          })};

          promptMainMenu();