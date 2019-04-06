DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    primary key (item_id)
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Lawnmower","Lawn Care",150,10),
        ("Weed Eater","Lawn Care",50,20),
        ("Television","Home Entertainment","500",15),
        ("Xbox","Home Entertainment",200,12),
        ("Bananas","Food",1,500),
        ("Salmon","Food",10,200),
        ("Socks","Clothing",3,325),
        ("Phil Collins CD","Music",9,2000),
        ("Paper Towels","Kitchen",4,275),
        ("Whole Milk","Food",3,150);