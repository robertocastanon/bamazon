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
VALUES 
 ("Apple Watch Series 4", "Electronics", 385.00, 89),
 ("Mortal Kombat 11", "Video Games", 69.75, 3),
 ("Spider-Man: Into the Spider-Verse", "Movies & TV", 24.25, 45),
 ("ASUS VivoBook F510UA 15.6", "Electronics", 590.50, 80),
 ("1984 By George Orwell", "Books", 7.75, 34),
 ("Google Pixle 3a", "Electronics", 395.75, 0),
 ("Hydro Flask Water Bottle", "Sports", 45.00, 5),
 ("BamazonBasics Luggage", "Travel Gear", 50.35, 15),
 ("Portable Hot Tub", "Outdoor", 405.00, 3),
 ("John Wick", "Movies & TV", 9.95, 42);