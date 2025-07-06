const AuthHelper = require("../Utils/AuthUtils")
const UserService = require("../services/UserService")
const ProductService = require("../services/ProductService")

module.exports = {
    getListUsers: async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json({ data: users });
        } catch (error) {
            console.log("err when getListUsers : ", error)
            return res.status(500).json({ message: "have wrong" });
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const userId = req.body.userId
            if (!userId) {
                return res.status(400).json({
                    message: "userId invalid"
                })
            }
            const result = await UserService.deleteUser(userId);
            if (result) {
                return res.status(200).json({ message: "User deleted successfully" });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.log("err when deleteUserById : ", error)
            return res.status(500).json({ message: "have wrong" });
        }
    },
    deleteProductById: async (req, res) => {
        try {
            const productId = req.body.productId
            if (!productId) {
                return res.status(400).json({
                    message: 'productId invalid'
                })
            }
            const result = await ProductService.deleteProduct(productId);
            if (result) {
                return res.status(200).json({ message: "Product deleted successfully" });
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.log("err when deleteProductById : ", error)
            return res.status(500).json({ message: "have wrong" });
        }
    },
    addNewProduct: async (req, res) => {
        try {
            const { productName, productPrice } = req.body;
            if (!productName || !productPrice) {
                return res.status(400).json({
                    message: "missing data"
                })
            }
            if (!Number(productPrice)) {
                return res.status(400).json({
                    message: "productPrice invalid"
                })
            }
            const newProduct = await ProductService.addNewProduct({ productName, productPrice });
            return res.status(201).json({ data: newProduct });
        } catch (error) {
            console.log("err when addNewProduct : ", error)
            return res.status(500).json({ message: "have wrong" });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { productId, productName, productPrice } = req.body;
            if (!productId) {
                return res.status(400).json({
                    message: "productId invalid"
                })
            }

            const updatedProduct = await ProductService.updateProduct({ productId, productName, productPrice });
            if (updatedProduct) {
                return res.status(200).json({ data: updatedProduct });
            } else {
                return res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.log("err when updateProduct : ", error)
            return res.status(500).json({ message: "have wrong" });
        }
    },
}