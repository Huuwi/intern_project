db = db.getSiblingDB('bai10');

db.User.insertMany([
    { username: 'admin', password: '$2b$10$rkvLjQoPiUYYGeJttykM4evzS5cVoiBjeQDUoFNhLivBSDwDksCnu', nickName: 'admin', isAdmin: true },
    { username: 'user1', password: '$2b$10$tNnWnjg0xrq5qewl52BcAe60F1SvqgHmkSn4unxtEHpxTDMGS.XiC', nickName: 'user1', isAdmin: false },
]);

db.Product.insertMany([
    {
        productName: 'iPhone 15 Pro Max',
        productPrice: 1399.99,
        imageLink: "https://tse4.mm.bing.net/th/id/OIP.6am3LshHjxAj8Oe_z99tTQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        normalizedProductName: 'iphone15promax'
    },
    {
        productName: 'Samsung Galaxy S24 Ultra',
        productPrice: 1299.99,
        imageLink: "https://th.bing.com/th/id/OIP.b1qP_w3Mcm9j-vcrRPfCigHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
        normalizedProductName: 'samsunggalaxys24ultra'
    },
    {
        productName: 'MacBook Air M2 13',
        productPrice: 1099.00,
        imageLink: "https://th.bing.com/th/id/R.475c4ecd2031708c7141f7d01db2bce8?rik=6OgBFqOT4pn1ZQ&pid=ImgRaw&r=0",
        normalizedProductName: 'macbookairm213"'
    },
    {
        productName: 'Dell XPS 15',
        productPrice: 1599.00,
        imageLink: "https://tse4.mm.bing.net/th/id/OIP.P9JtjcLE4XJ_L4HrcIpOsAHaDW?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        normalizedProductName: 'dellxps15'
    },
    {
        productName: 'Apple Watch Series 9',
        productPrice: 399.99,
        imageLink: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/apple-watch-series-9.png",
        normalizedProductName: 'applewatchseries9'
    },
    {
        productName: 'Sony WH-1000XM5 Headphones',
        productPrice: 349.99,
        imageLink: "https://tse4.mm.bing.net/th/id/OIP.jzVtyTSDIE3hMKn307UNFQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        normalizedProductName: 'sonywh-1000xm5headphones'
    },
    {
        productName: 'Logitech MX Master 3S Mouse',
        productPrice: 99.99,
        imageLink: "https://content.presspage.com/uploads/1465/1920_high-resolution-png-mxmaster3sprofilepalegrey.png",
        normalizedProductName: 'logitechmxmaster3smouse'
    },
    {
        productName: 'ASUS ROG Strix RTX 4080 GPU',
        productPrice: 1199.00,
        imageLink: "https://th.bing.com/th/id/OIP.523vyTdkhMM7j-9uTpb_zAHaEk?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
        normalizedProductName: 'asusrogstrixrtx4080gpu'
    },
    {
        productName: 'Lenovo Legion 5 Gaming Laptop',
        productPrice: 1195.00,
        imageLink: "https://p4-ofp.static.pub/fes/cms/2021/07/08/522ba6qvkbxurmpepjnzmo346fc2hp722919.png",
        normalizedProductName: 'lenovolegion5gaminglaptop'
    },
    {
        productName: 'Kindle Paperwhite Signature Edition',
        productPrice: 189.99,
        imageLink: "https://m.media-amazon.com/images/G/01/kindle/journeys/r9lAuNrU8e3bnWhy2Bx2jiEFSf7z4NoBS2BsrsHjzBR9A3D/MjM3YzkyZWUt._CB544939607_.png",
        normalizedProductName: 'kindlepaperwhitesignatureedition'
    },
    {
        productName: 'Nothing Ear True Wireless Stereo',
        productPrice: 59.99,
        imageLink: 'https://th.bing.com/th/id/OIP.E6cdlsLmmMWUVgUR2PRKUwHaIV?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
        normalizedProductName: 'nothingeartruewirelesstwo'
    },
    {
        productName: 'JBL TUNE Beam 2 Ghost Edition ANC Earbuds',
        productPrice: 89.99,
        imageLink: 'https://tse3.mm.bing.net/th/id/OIP.UPG2rE48XxvXnh-b1isLtwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        normalizedProductName: 'jbltunebeam2ghostedition'
    },
    {
        productName: 'Samsung Galaxy A55 5G 8GB',
        productPrice: 349.99,
        imageLink: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/m/sm-a556_galaxy_a55_awesome_navy_ui_2.png',
        normalizedProductName: 'samsunggalaxya558gb'
    },
    {
        productName: 'Xiaomi Redmi 14C 4GB/128GB',
        productPrice: 179.99,
        imageLink: 'https://cellmart.pk/wp-content/uploads/2024/10/redmi-14c-green-cellmart.png',
        normalizedProductName: 'xiaomiredmi14c4g128gb'
    },
    {
        productName: 'Dell Inspiron Laptop 15"',
        productPrice: 499.99,
        imageLink: 'https://tse3.mm.bing.net/th/id/OIP.FVVXAfXAz7zWHoWROz-Q0wHaEx?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        normalizedProductName: 'dellinspironlaptop15'
    },
    {
        productName: 'Acer Aspire Lite 15 Laptop',
        productPrice: 579.99,
        imageLink: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1691601079/Croma%20Assets/Computers%20Peripherals/Laptop/Images/275785_7_y12h3h.png',
        normalizedProductName: 'aceraspirelite15laptop'
    },
    {
        productName: 'Google Pixel 9 Pro Fold',
        productPrice: 1299.99,
        imageLink: 'https://static1.anpoimages.com/wordpress/wp-content/uploads/2024/08/google-pixel-9-pro-fold-porcelain-official-render.png',
        normalizedProductName: 'googlepixel9profold'
    },
    {
        productName: 'Sony WF-1000XM6 Earbuds',
        productPrice: 249.99,
        imageLink: 'https://m.media-amazon.com/images/I/61MgPeUAfvL.jpg',
        normalizedProductName: 'sonywf1000xm6earbuds'
    },
    {
        productName: 'Samsung Galaxy Z Flip 6',
        productPrice: 999.99,
        imageLink: 'https://tse1.mm.bing.net/th/id/OIP.lOUpN_2yvuzKUfTwaA5QaQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        normalizedProductName: 'samsunggalaxyzflip6'
    },
    {
        productName: 'LG C4 OLED 65-inch TV',
        productPrice: 1196.99,
        imageLink: 'https://tse2.mm.bing.net/th/id/OIP.md2nWQaVfojbfGXV4iNILgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        normalizedProductName: 'lgc4oled65tv'
    },
    {
        productName: "Random human",
        productPrice: 1111,
        imageLink: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a85ea6ea-16aa-4285-b9cb-e3b3cf66d6ef/dgj9zif-581cb19f-d905-4d21-9154-ff50027e9325.png/v1/fill/w_894,h_718/vladimir_putin___png_by_simmeh_dgj9zif-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzE4IiwicGF0aCI6IlwvZlwvYTg1ZWE2ZWEtMTZhYS00Mjg1LWI5Y2ItZTNiM2NmNjZkNmVmXC9kZ2o5emlmLTU4MWNiMTlmLWQ5MDUtNGQyMS05MTU0LWZmNTAwMjdlOTMyNS5wbmciLCJ3aWR0aCI6Ijw9ODk0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.TtzsIeJ25S3-IaGXoEreq9fu4arUNs4ZuYBsohNGtQw",
        normalizedProductName: "randomhuman"
    },
    {
        productName: "Child",
        productPrice: 1111,
        imageLink: "https://png.pngtree.com/png-vector/20231121/ourmid/pngtree-cute-asian-child-girl-in-christmas-dress-making-heart-shape-with-png-image_10690846.png",
        normalizedProductName: "child"
    },
    {
        productName: "Gun",
        productPrice: 1111,
        imageLink: "https://tse4.mm.bing.net/th/id/OIP.D2VLbiYTMH6EDbOIG11cgAHaDz?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        normalizedProductName: "gun"
    },
]
);
