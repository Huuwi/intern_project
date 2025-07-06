db = db.getSiblingDB('bai10');

db.User.insertMany([
    { username: 'admin', password: '$2b$10$rkvLjQoPiUYYGeJttykM4evzS5cVoiBjeQDUoFNhLivBSDwDksCnu', nickName: 'admin', isAdmin: true },
    { username: 'user1', password: '$2b$10$tNnWnjg0xrq5qewl52BcAe60F1SvqgHmkSn4unxtEHpxTDMGS.XiC', nickName: 'user1', isAdmin: false },
]);

db.Product.insertMany([
    {
        productName: 'iPhone 15 Pro Max',
        productPrice: 1399.99,
        normalizedProductName: 'iphone15promax'
    },
    {
        productName: 'Samsung Galaxy S24 Ultra',
        productPrice: 1299.99,
        normalizedProductName: 'samsunggalaxys24ultra'
    },
    {
        productName: 'MacBook Air M2 13"',
        productPrice: 1099.00,
        normalizedProductName: 'macbookairm213"'
    },
    {
        productName: 'Dell XPS 15',
        productPrice: 1599.00,
        normalizedProductName: 'dellxps15'
    },
    {
        productName: 'Apple Watch Series 9',
        productPrice: 399.99,
        normalizedProductName: 'applewatchseries9'
    },
    {
        productName: 'Sony WH-1000XM5 Headphones',
        productPrice: 349.99,
        normalizedProductName: 'sonywh-1000xm5headphones'
    },
    {
        productName: 'Logitech MX Master 3S Mouse',
        productPrice: 99.99,
        normalizedProductName: 'logitechmxmaster3smouse'
    },
    {
        productName: 'ASUS ROG Strix RTX 4080 GPU',
        productPrice: 1199.00,
        normalizedProductName: 'asusrogstrixrtx4080gpu'
    },
    {
        productName: 'Lenovo Legion 5 Gaming Laptop',
        productPrice: 1195.00,
        normalizedProductName: 'lenovolegion5gaminglaptop'
    },
    {
        productName: 'Kindle Paperwhite Signature Edition',
        productPrice: 189.99,
        normalizedProductName: 'kindlepaperwhitesignatureedition'
    }
]
);
