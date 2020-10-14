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
        choices: ["Add Department","Add Role","Add Employee", "Quit"]
    }).then(function ( choice ) {
        if ( choice.choice  === "Add Department") {
            addDep()
        } else if (choice.choice === "Add Role") {
            addRole()
        } else if (choice.choice === "Add Employee") {
            addEmployee()
        } else if (choice.choice === "Quit") {
            connection.end()
        }
    })

}

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
}

function addRole() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err

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
}