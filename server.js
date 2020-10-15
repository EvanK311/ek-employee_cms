var inquirer = require("inquirer");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerdb"
});

connection.connect(function (err) {
    if (err) throw err;
    cmsCreator();
});

function cmsCreator() {
    console.log("never give up, yo")
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "Select an action",
        choices: ["Add Department","Add Role","Add Employee","View Employees", "View Roles", "View Departments", "Quit"]
    }).then(function ( choice ) {
        if ( choice.choice  === "Add Department") {
            addDep()
        } else if (choice.choice === "Add Role") {
            addRole()
        } else if (choice.choice === "Add Employee") {
            addEmployee()
        }else if (choice.choice === "View Employees") {
             viewEmployees()
        }else if (choice.choice === "View Roles") {
            viewRoles()
        }else if (choice.choice === "View Departments") {
            viewDepartments()
        } else if (choice.choice === "Quit") {
            connection.end()
        }
    })
};

// function to add to Department table
function addDep() {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter the name of the department"
    }).then(function (answers) {
        connection.query("INSERT INTO department SET ?", {names: answers.name}, function (err) {
            if (err) throw err
            cmsCreator()
        })
    })
};

// function to add to Roles table
function addRole() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err
// pulls department and id from department table
        let depArr = data.map(function (dep) {
            return {
                name: dep.names,
                value: dep.id
            }
        })
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "Enter the employee title"
            }, {
                name: "depId",
                type: "list",
                message: "What is the department of this employee??",
                choices: depArr
            }, {
                name: "salary",                
                type: "number",
                message: "how much money is this one making??"
            },
        ]).then(function (answers) {
            connection.query("INSERT INTO Role SET ?", {
                
                title: answers.title,
                salary: answers.salary,
                Department_id: answers.depId
            }, function (err) {
                if (err) throw err
                cmsCreator()
            })
        })
    })
};


// function to add employees to table
function addEmployee() {
    connection.query("SELECT * FROM Role", function (err, data) {
        if (err) throw err

        let rolesArr = data.map(function (dep) {
            return {
                name: dep.Title,
                value: dep.id
            }
        })
        inquirer.prompt([
            {
                name: "firstname",
                type: "input",
                message: "Enter the employee's first name"
            },
            {
                name: "lastname",
                type: "input",
                message: "Enter the employee's last name"
            },
            {
                name: "manager",
                type: "confirm",
                message: "Is this employee a manager?"
            },
            {
                name: "roleId",
                type: "list",
                message: "What is this employee's role?",
                choices: rolesArr
            }
        ]).then(function (answers) {
            connection.query("INSERT INTO employee SET ?", {
                first_name: answers.firstname,
                last_name: answers.lastname,
                manager_id: answers.manager,
                role_id: answers.roleId
            }, function (err) {
                    if (err) throw err;
                    cmsCreator()
            })
        })
    })
};

// functions to view tables
function viewEmployees() {
    connection.query("SELECT * FROM employee_trackerDB.employee", function (err, data) {
        if (err) throw err
        console.table(data)
        cmsCreator()
    })
};

function viewRoles() {
    connection.query("SELECT * FROM employee_trackerDB.Role", function (err, data) {
        if (err) throw err
        console.table(data)
        console.log("touch string")
        cmsCreator()
    })
    
};

function viewDepartments() {
    connection.query("SELECT * FROM employee_trackerDB.department", function (err, data) {
        if (err) throw err
        console.table(data)
        cmsCreator()
    })
};