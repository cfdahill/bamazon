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
// this will be to push the product names into by mysql and then used by inquirer
var thisSale;

connection.connect();
connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price);
        products.push(res[i].product_name);
    }
    //displays all products and prices, creates the products array;

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
                    //if user input is not a number than it will not accept the value of the input
                }
                else {
                    return true;
                }
            }
        }
    ]).then(function (answers) {
        var arrPosition = products.indexOf(answers.product);
        //this will refer to the object of the chosen product
        var qty = parseInt(answers.quantity);
        if (qty < res[arrPosition].stock_quantity) {
            var newQty = res[arrPosition].stock_quantity - qty;
            //this will be used to update the quantities in mySQL
            thisSale = parseFloat((qty * res[arrPosition].price+res[arrPosition].product_sales).toFixed(2));
            //this line inserted for part 3
            var tax = parseFloat((qty * res[arrPosition].price * 0.073).toFixed(2));
            //We live in Arizona, we have to pay taxes on online sales
            var total = (tax + (answers.quantity * res[arrPosition].price)).toFixed(2);
            console.log("Your purchase:\n" + answers.product + " || QTY: " + qty + " || Price/Unit: $" + res[arrPosition].price
                + "\nTax at 7.3%: $" + tax + "\nShipping and Handling: $0.00 (bPrime member)\nTotal: $" + total);
            updateQuantity(newQty, answers.product);
            //updates quanity in mySQL
            totalSales(thisSale, answers.product);
            //updates product_sales 
            connection.end();
        }
        else {
            console.log("We do not have enough " + answers.product + " in stock to fulfill your order.  We currently have " + res[arrPosition].stock_quantity + " in stock at this time.");
            connection.end();
        }
    });
});


function updateQuantity(newQty, product) {
    connection.query(
        "UPDATE products SET ? WHERE ?", [
            {
                stock_quantity: newQty
            },
            {
                product_name: product
            }
        ], function (err, res) {
            if (err) throw err;
        }
    );
};

function totalSales(thisSale, product) {
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                product_sales: thisSale
            },
            {
                product_name: product
            }
        ], function (err, res) {
            if (err) throw err;
        });
}


