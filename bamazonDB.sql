DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NULL,
  department_name VARCHAR(255) NULL,
  price DECIMAL(9,2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "electronics", "999", "25");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "electronics", "650", "50");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bicycle", "outdoor", "850", "12");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tent", "outdoor", "220", "18");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jeans", "clothing", "120", "32");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirt", "clothing", "60", "85");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("couch", "home goods", "650", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee maker", "home goods", "75", "30");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tire", "automotive", "130", "40");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gnome", "garden", "50", "75");


SELECT*FROM products;


