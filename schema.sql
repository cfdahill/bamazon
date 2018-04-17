-- create a table with item_id (Primary Key), product_name, department_name, price, and stock_quantity
-- populate with about 10 different products

create database bamazon_db;

use bamazon_db;

create table products (
id int auto_increment not null,
product_name varchar(60) not null,
department_name varchar(30),
price dec(5,2) not null,
stock_quantity int(3),
primary key(id)
);
