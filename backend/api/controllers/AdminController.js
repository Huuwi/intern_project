const AuthHelper = require("../Utils/AuthUtils")
const UserService = require("../services/UserService")
const ProductService = require("../services/ProductService")
const bcrypt = require("bcrypt");

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
            const { productName, productPrice, normalizedProductName, imageLink } = req.body;
            if (!productName || !productPrice || !normalizedProductName || !imageLink) {
                return res.status(400).json({
                    message: "missing data"
                })
            }
            if (!Number(productPrice)) {
                return res.status(400).json({
                    message: "productPrice invalid"
                })
            }
            const newProduct = await ProductService.addNewProduct({ productName, productPrice, normalizedProductName, imageLink });
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
    addNewUser: async (req, res) => {
        const { username, password, nickName } = req.body;
        if (!username || !password || !nickName) {
            return res.status(400).json({ message: "missing data!" });
        }

        try {
            const existingUser = await globalThis.db.collection("User").findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: "username already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                username,
                password: hashedPassword,
                nickName,
                isAdmin: false,
            };

            const result = await globalThis.db.collection("User").insertOne(newUser);
            const insertedUser = { ...newUser, _id: result.insertedId };

            return res.status(201).json({
                message: "add user successfully",
                userData: insertedUser,
            });

        } catch (error) {
            return res.status(500).json({
                message: "add user failed",
                error: error.message,
            });
        }
    },
}