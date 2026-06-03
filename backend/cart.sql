CREATE DATABASE nonperishkart;
USE nonperishkart;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price DECIMAL(10,2),
  discountPrice DECIMAL(10,2),
  image TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE products MODIFY image LONGTEXT;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  totalPrice DECIMAL(10,2),
  paymentMethod VARCHAR(50),
  customerName VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  pincode VARCHAR(20),
  status VARCHAR(50) DEFAULT 'Order Placed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

USE nonperishkart;

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId INT,
  productId INT,
  productName VARCHAR(255),
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD isAdmin BOOLEAN DEFAULT FALSE;

SELECT * FROM users;

UPDATE users
SET isAdmin = TRUE
WHERE email = 'satvikrchorge@gmail.com';

SELECT id, name, email, isAdmin
FROM users
WHERE email = 'satvikrchorge@gmail.com';

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  productId INT,
  userName VARCHAR(255),
  rating INT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
);

ALTER TABLE products
ADD stock INT DEFAULT 10;

ALTER TABLE orders
ADD userId INT;