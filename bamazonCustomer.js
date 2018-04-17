/*
Running this should do the following:
-display all items for sale; include id, name, and price
-prompt user to make a choice:
    -1. id of product to buy
    -2. how many units
-use customer request to check that there are enough units available
    -if not, notify customer and end order
    if so, update sql to show new total units available, show customer total cost of purchase

    nmp needed: mysql, inquirer
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

var products = [];

connection.connect();
connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price);
        products.push(res[i].product_name);
    }
    //console.log(products);

    inquirer.prompt([
        {
            name: "product",
            type: "list",
            message: "Which product would you like to purchase?",
            choices: products
        },
        {
            name: "quantity",
            message: "How many would you like to purchase?",
            validate: function (ans) {
                if (isNaN(ans) === true) {
                    console.log("\nPlease choose a numerical value.")
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    ]).then(function (answers) {
        var arrPosition = products.indexOf(answers.product);
        var qty = parseInt(answers.quantity);
        var tax = parseFloat((qty * res[arrPosition].price * 0.073).toFixed(2));
        var total = (tax + (answers.quantity * res[arrPosition].price)).toFixed(2);
        console.log("Your purchase:\n" + answers.product + " || QTY: " + qty + " || Price/Unit: $" + res[arrPosition].price
                    + "\nTax at 7.3%: $" + tax + "\nShipping and Handling: $0.00 (bPrime member)\nTotal: $" + total);

        //still need to update quantity in database
        connection.end();
    });


});
