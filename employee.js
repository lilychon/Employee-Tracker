var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MyPassword",
    database: "employeeDB"
});

connection.connect(err => {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "VAUD",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "View employees by manager",
                "Add departments",
                "Add roles",
                "Add employees",
                "Update employee roles",
                "Update employee manager",
                "Delete departments",
                "Delete roles",
                "Delete employees",
                "Exit"
            ]
        })
        .then(answers => {
            switch (answers.VAUD) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "View employees by manager":
                    viewEmployeesByManager();
                    break;
                case "Add departments":
                    addDepartments();
                    break;
                case "Add roles":
                    addRoles();
                    break;
                case "Add employees":
                    addEmployees();
                    break;
                case "Update employee roles":
                    updateEmployeeRoles();
                    break;
                case "Update employee manager":
                    updateEmployeeManager();
                    break;
                case "Delete departments":
                    deleteDepartments();
                    break;
                case "Delete roles":
                    deleteRoles();
                    break;
                case "Delete employees":
                    deleteEmployees();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        })
}

// VIEW

function viewAllDepartments() {
    let query = `SELECT * FROM department`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllRoles() {
    let query = `SELECT * FROM role`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllEmployees() {
    let query = `SELECT e.id, e.first_name, e.last_name, title, name 'department', salary, IFNULL(CONCAT(m.first_name, ' ' , m.last_name),
    'null') AS 'manager' FROM employees e
    LEFT JOIN role on e.role_id = role.id
    LEFT JOIN employees m ON e.manager_id = m.id
    LEFT JOIN department ON department_id = department.id;`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewEmployeesByManager() {

}

// ADD

function addDepartments() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "Enter a new department name"
            }
        ])
        .then(answers => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answers.department,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Successfully added "+ res.affectedRows);
                    start();
                }
            );
        });
}

function addRoles() {
    let query = `SELECT * FROM department`
    connection.query(query, function (err, res) {
        if (err) throw err;
        let deptChoices = res.map(data => ({
            value: data.id,
            name: data.name
        }));

        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "Enter a role title"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "Enter salary for role"
                },
                {
                    name: "dept",
                    type: "list",
                    message: "Choose department",
                    choices: deptChoices
                }
            ])
            .then(answers => {
                let query = `INSERT INTO role SET ?`
                connection.query(query,
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: answers.dept
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        start();
                    }
                );
            })
    })
}

function addEmployees() {
    let query = `SELECT e.id, e.first_name, e.last_name, r.id, title, IFNULL(CONCAT(m.first_name, ' ' , m.last_name),
    'null') AS 'manager' FROM employees e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN employees m ON e.manager_id = m.id`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        let roleChoices = res
            .map(data => ({
                name: data.title,
                value: data.id
            }));
        let newRoleChoices = Array.from(new Set(roleChoices));
        let managerChoices = res
            .filter(data => data.title.includes('Manager'))
            .map(data => ({
                value: data.id,
                name: data.first_name + " " + data.last_name + " " + data.title
            }))

        inquirer
            .prompt([
                {
                    name: "fname",
                    type: "input",
                    message: "Enter employee's first name"
                },
                {
                    name: "lname",
                    type: "input",
                    message: "Enter employee's last name"
                },
                {
                    name: "role",
                    type: "list",
                    message: "Choose employee's role",
                    choices: newRoleChoices
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Choose employee's manager",
                    choices: managerChoices
                }
            ])
            .then(answers => {                
                let query = `INSERT INTO employees SET ?`
                connection.query(query,
                    {
                        first_name: answers.fname,
                        last_name: answers.lname,
                        manager_id: answers.manager,
                        role_id: answers.role
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        start();
                    }
                );
            })
    })
}

// UPDATE

function updateEmployeeRoles() {

}

function updateEmployeeManager() {

}

// DELETE

function deleteDepartments() {
    let query = `SELECT * FROM department`
    connection.query(query, function (err, res) {
        if (err) throw err;
        let deptChoices = res.map(data => ({
            value: data.id,
            name: data.name
        }));

        inquirer
            .prompt([
                {
                    name: "dept",
                    type: "list",
                    message: "Choose department to delete",
                    choices: deptChoices
                }
            ])
            .then(answers => {
                let query = `DELETE FROM department WHERE ?`
                connection.query(query,
                    {
                        id: answers.dept
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        start();
                    }
                );
            })
    })
}

function deleteEmployees() {
    let query = `SELECT * FROM employees`
    connection.query(query, function (err, res) {
        if (err) throw err;
        let employeeChoices = res.map(data => ({
            value: data.id,
            name: data.first_name + " " + data.last_name
        }));
        console.table(employeeChoices);

        inquirer
            .prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Choose employee to delete",
                    choices: employeeChoices
                }
            ])
            .then(answers => {
                let query = `DELETE FROM employees WHERE ?`
                connection.query(query,
                    {
                        id: answers.employee
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        start();
                    }
                );
            })
    })
}

function deleteRoles() {
    let query = `SELECT * FROM role`
    connection.query(query, function (err, res) {
        if (err) throw err;
        let roleChoices = res.map(data => ({
            name: data.title,
            value: data.id
        }));

        inquirer
            .prompt([
                {
                    name: "role",
                    type: "list",
                    message: "Choose role to delete",
                    choices: roleChoices
                }
            ])
            .then(answers => {
                let query = `DELETE FROM role WHERE ?`
                connection.query(query,
                    {
                        id: answers.role
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        start();
                    }
                );
            })
    })
}