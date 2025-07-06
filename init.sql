USE bai10;

-- Tạo bảng Users
CREATE TABLE IF NOT EXISTS Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    nickName VARCHAR(30),
    isAdmin BOOLEAN DEFAULT 0
);

-- Tạo bảng Product
CREATE TABLE IF NOT EXISTS Product (
    productId INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    productPrice DECIMAL(10, 2) NOT NULL
);

-- Chèn dữ liệu mẫu vào bảng Users
INSERT INTO
    Users (
        username,
        password,
        nickName,
        isAdmin
    )
VALUES ('admin', 'admin', 'admin', 1),
    ('user1', 'user1', 'user1', 0);

-- Chèn dữ liệu mẫu vào bảng Product
INSERT INTO
    Product (productName, productPrice)
VALUES ('iPhone 15 Pro Max', 1399.99),
    (
        'Samsung Galaxy S24 Ultra',
        1299.99
    ),
    ('MacBook Air M2 13"', 1099.00),
    ('Dell XPS 15', 1599.00),
    (
        'Apple Watch Series 9',
        399.99
    ),
    (
        'Sony WH-1000XM5 Headphones',
        349.99
    ),
    (
        'Logitech MX Master 3S Mouse',
        99.99
    ),
    (
        'ASUS ROG Strix RTX 4080 GPU',
        1199.00
    ),
    (
        'Lenovo Legion 5 Gaming Laptop',
        1195.00
    ),
    (
        'Kindle Paperwhite Signature Edition',
        189.99
    );