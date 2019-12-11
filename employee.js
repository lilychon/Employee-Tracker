var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MyPassword",
    database: "employeeDB"
});

connection.connect(function (err) {
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
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
    })
}

function viewAllRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
    })
}

function viewAllEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
    })
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
                    console.log(res);
                    start();
                }
            );
        });
}

function addRoles() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
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
                    name: "depID",
                    type: "rawlist",
                    message: "Choose department",
                    choices:
                        function () {
                            var choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArray.push(res[i].name);
                            }
                            return choiceArray;
                        },
                }
            ])
            .then(answers => {
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: answers.depID
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(res);
                        start();
                    }
                );
            })
    });
}

function addEmployees() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                message: "Enter employee's first name"
            },
            {
                name: "department",
                type: "input",
                message: "Enter employee's first name"
            },
            {
                name: "department",
                type: "input",
                message: "Enter employee's first name"
            },
            {
                name: "department",
                type: "input",
                message: "Enter employee's first name"
            },
        ])
        .then(answers => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answers.department,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    start();
                }
            );
        });
}

