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