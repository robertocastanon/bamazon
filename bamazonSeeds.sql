DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  sku INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL (10,2) NULL,
  stock_quantity INT DEFAULT 0 NULL,
  PRIMARY KEY (sku)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch Series 4", "Electronics", 379, 890);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mortal Kombat 11", "Video Games", 59.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spider-Man: Into the Spider-Verse", "Movies & TV", 24.99, 455);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ASUS VivoBook F510UA 15.6", "Electronics", 588, 780);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1984 By George Orwell", "Books", 7.79, 340);
