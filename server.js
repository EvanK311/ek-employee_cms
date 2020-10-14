var inquirer = require("inquirer");
var mysql = require("mysql");
// require("console.table");

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
        choices: ["Add Employee", "Add Department", "Quit"]
    }).then(function (response) {
        if (response === "Add Department") {
            addDep()
        } else if (response === "Add Employee") {
            addEmployee()
        }
        else {
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
        connection.query("INSERT INTO department SET ?", { Name: answers.names }, function (err) {
            if (err) throw err
            cmsCreator()
        })
    })
}
// addDep()
// function addEmployee() {
//     connection.query("SELECT * FROM Department", function (err, data) {
//         if (err) throw err

//         let depArr = data.map(function (dep) {
//             return {
//                 name: dep.Names,
//                 value: dep.id
//             }
//         })
//     })

//     inquirer.prompt([
//         {
//             name: "name",
//             type: "input",
//             message: "Enter the employee's first name"
//         },
//         {
//             name: "name",
//             type: "input",
//             message: "Enter the employee's last name"
//         },
//         {
//             name: "roleid",
//             type: "input",
//             message: ""
//         }
//     ])
// }