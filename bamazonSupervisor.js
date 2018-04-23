/*
Create a mysql table called departments with the following info:
    department_id
    department_name (make this read the product department section)
    over_head_costs
    total_profit (have to math this one)
Modify products table so that is has a product_sales column
Modify bamazonCustomer.js so that it adjusts product_sales by adding the total sales
At this point check that bmazonCustomer still works properly

This node file will do the following:
1. View product sales by department
    display summary table of department_id || department_name || over_head_costs || product sales || total_profit
        total_profit = product_sales - total_profit
2. Create new department
*/

require("dotenv").config();
var mysqlPW = require("./keys.js");
var password = mysqlPW.mysqlPW.mysql_pw;
//The above lines are to make it so that my mySQL password does not get uploaded

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: "bamazon_db"
});

inquirer.prompt([
    {
        name: "action",
        type: "rawlist",
        message: "Greetings, supervisor.  What can I assist you with today?",
        choices: ["View Product Sales by Department", "Create a new department", "Fire Mr. Manager"]
    }
]).then(function (ans) {
    switch (ans.action) {
        case "View Product Sales by Department":
            viewSales();
            break;
        case "Create a new department":
            createDept();
            break;
        case "Fire Mr. Manager":
            fire();
            break;
    }
});

function viewSales() {
    //This part is basically a copy and paste from bamazonManager which is basically a copy and paste from bamazonCustomer
    connection.connect(function () {
        connection.query("SELECT * FROM departments", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("Department ID: " + res[i].id + " || Name: " + res[i].department_name + " || Over Head Cost: $" + res[i].over_head_cost + " || Product Sales: $" + res[i].product_sales + " || Profit: $" + res[i].total_profit);
            }
        });
    });
    connection.end();
    //going to close connection at end of each if statement so I can return afterwards
}

function createDept() {
    //This will be very similar to addProduct() in bamazonManager.  Get that working and then copy over here and modify.  Once this is working, make sure the bamazonManager can see that option when adding product.
}

function fire() {
    inquirer.prompt([
        {
            name: "part2",
            type: "list",
            message: "Really?",
            choices: ["yes"]
        },
        {
            name: "part3",
            type: "list",
            message: "Do you even have authority to fire people?",
            choices: []
        }
    ]).then(function (ans) {
        console.log("watch Arrested Development to finish this");
    });
}