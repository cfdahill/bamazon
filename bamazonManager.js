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

var products = [];

inquirer.prompt([
    {
        name: "action",
        type: "rawlist",
        message: "Hello, Mr. Manager, what would you like to do today?",
        choices: ["View products for sale", "View low inventory products", "Add new inventory", "Add new product", "Wow, I'm Mr. Manager!"]

    }
]).then(function (ans) {
    switch (ans.action) {
        case "View products for sale":
            viewMerch();
            break;

        case "View low inventory products":
            lowQuantity();
            break;

        case "Add new inventory":
            addInventory();
            break;
//---------------------------------------------------Below was added with no functioning internet
        case "Add new product":
            addProduct();
            break;
//---------------------------------------------------
        case "Wow, I'm Mr. Manager!":
            //Give me an opportunity to make an Arrested Development reference and I will take it!
            mrMananger();
            break;
    }
});

function viewMerch() {
    //This part is basically a copy and paste from bamazonCustomer
    connection.connect();
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price + " || QTY: " + res[i].stock_quantity);
        }
    });
    connection.end();
    //going to close connection at end of each if statement so I can return afterwards

}

function lowQuantity() {
    connection.connect();
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Running low on the following products:\nID:" + res[i].id + " || Product: " + res[i].product_name + " || QTY: " + res[i].stock_quantity);
        }
    });
    connection.end();
}

function addInventory() {
    connection.connect();
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            products.push(res[i].product_name);
            console.log("ID: " + res[i].id + " || Product: " + res[i].product_name + " || QTY: " + res[i].stock_quantity);

        }
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                message: "What product is the quantity being updated for?",
                choices: products
            }
            , {
                name: "add",
                message: "How many new items would you like to add to the current quantity?",
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
        ]).then(function (ans) {
            var arrPosition = products.indexOf(ans.product);
            var newQty = products[arrPosition].stock_quantity + ans.add
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQty
                    },
                    {
                        product_name: ans.product
                    }
                ], function (err, res) {
                    if (err) throw err;
                    console.log("The inventory has been adjusted:\nID: " + res[arrPosition].id + " || Product: " + res[arrPosition].product_name + " || QTY: " + res[arrPosition].stock_quantity);
                }
            );
        });
    });
    connection.end();
}
//--------------------------------------------------------Below this was created without functioning internet connection
function addProduct() {
    var dept = [];
    connection.connect();
    connection.query("SELECT department_name FROM departments", function(err, res) {
        if (err) throw err;
        for( var i = 0; i < res.length; i++) {
            dept.push(res[i]);
        }
    });
    inquirer.prompt([
        {
            name: "name",
            message: "What is the product name?",
        },
        {
            name: "department",
            type: "list",
            message: "What department does this product belong in?",
            choices: dept
        },
        {
            name: "cost",
            message: "What is the sale price of the product?  Note: do not include $",
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
        },
        {
            name: "quantity",
            message: "What is the current quantity of the product?",
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
    ]).then(function(ans) {
        
    })
}
//----------------------------------------------------------------------
function mrManager() {
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
}