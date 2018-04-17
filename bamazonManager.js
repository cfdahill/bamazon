/*OPTIONAL (part 2)
create a menu to view:
    products for sale - will list id, name, price, and quantity of product
    low inventory - display all items with <5 left in stock
    add to inventory - prompt to add more of item currently in store
    add new product - add completely new product

npm needed (already dl'ed): mysql, inquirer

Read up on SUPER OPTIONAL (part 3)
*/

require("dotenv").config();
var mysqlPW = require("./keys.js");
var password = mysqlPW.mysqlPW.mysql_pw;
//The above lines are to make it so that my mySQL password does not get uploaded

var inquirer = require("inquirer");
var mysql = require("mysql");

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
        message: "Hello, Mr. Manager, what would you like to do today?",
        choices: ["View products for sale", "View low inventory products", "Add new inventory", "Add new product", "Wow, I'm Mr. Manager!"]

    }
]).then(function (ans) {
    if (ans.action == "View products for sale") {
        //This part is basically a copy and paste from bamazonCustomer
        connection.connect();
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price + " || QTY: " + res[i].stock_quantity);
            }
        });
        connection.end();
        return;
        //going to close connection at end of each if statement so I can return afterwards
    }
    else if(ans.action == "View low inventory products") {
        connection.connect();
        connection.query("")
    }
    else if (ans.action == "Wow, I'm Mr. Manager!") {
        //Give me an opportunity to make an Arrested Development reference and I will take it!
            inquirer.prompt([
                {
                    name: "response",
                    type: "list",
                    message: 'Well, manager.  We just say "manager"',
                    choices: ["I know, but you sai-"]
                }
            ]).then(function (ans) {
                console.log("Doesn't matter who.\n\n Did you want to do something, Mr. Manager?");
            });
            return;
        }
    });