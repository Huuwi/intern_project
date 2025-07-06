const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
    const products = await globalThis.db.collection('Product').find({}).toArray();
    return products;
};

const getProductById = async (productId) => {
    const product = await globalThis.db.collection('Product').findOne({ _id: new ObjectId(productId) });
    return product;
};

const addNewProduct = async ({ productName, productPrice }) => {
    const newProduct = {
        productName,
        productPrice: Number(productPrice),
    };

    await globalThis.db.collection('Product').insertOne(newProduct);

    return newProduct;
};

const updateProduct = async ({ productId, productName, productPrice }) => {
    const collection = globalThis.db.collection('Product');

    const existing = await collection.findOne({ _id: new ObjectId(productId) });
    if (!existing) return null;

    const updateFields = {
        productName: productName || existing.productName,
        productPrice: productPrice !== undefined ? Number(productPrice) : existing.productPrice
    };

    const result = await collection.updateOne(
        { _id: new ObjectId(productId) },
        { $set: updateFields }
    );

    if (result.matchedCount === 0) return null;

    return await collection.findOne({ _id: new ObjectId(productId) });
};

const deleteProduct = async (productId) => {
    const result = await globalThis.db.collection('Product').deleteOne({ _id: new ObjectId(productId) });
    return result.deletedCount > 0;
};

const pagination = async (skip, limit) => {
    let products = await globalThis.db.collection("Product").find().skip(skip).limit(limit).toArray()
    return products
};

const findProductByName = async (name) => {
    let normalized = name.normalize("NFKD").replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(" ", '')
    const regex = new RegExp(`.*${normalized}.*`);

    const products = await globalThis.db.collection("Product").find({
        normalizedProductName: { $regex: regex }
    }).toArray();

    return products;

}

const ProductService = {
    getAllProducts,
    addNewProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    pagination,
    findProductByName
};

module.exports = ProductService;
