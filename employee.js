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
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewAllEmployees() {
    let query = `Select e.id, e.first_name, e.last_name, title, name 'department', salary, IFNULL(CONCAT(m.first_name, ' ' , m.last_name),
    'null') AS 'manager' from employees e
    left join role on e.role_id = role.id
    left join employees m on e.manager_id = m.id
    left join department on department_id = department.id;`;
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
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
    // let deptChoices = [];
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // for (let i = 0; i < res.length; i++) {
        //     deptChoices.push(res[i].id + " - " + res[i].name)
        // }
       let deptChoices = res.map(dept => dept.id + " - " + dept.name)
        // console.log(deptChoices);

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
            console.log(answers);
            let newRole = answers.title;
            console.log(newRole);
            let dept = parseInt(answers.dept[0]);
            let salary = parseFloat(answers.salary);
            console.log(dept);
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: newRole,
                    salary: salary,
                    department_id: dept
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
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
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
                    type: "input",
                    message: "Choose role",
                    choices:
                        function () {
                            var choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArray.push(res[i].role_id);
                            }
                            return choiceArray;
                        },
                },
                {
                    name: "manager",
                    type: "input",
                    message: "Choose Manager",
                    choices:
                        function () {
                            var choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArray.push(res[i].manager_id);
                            }
                            return choiceArray;
                        },
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
    })
}

