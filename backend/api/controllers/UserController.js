const UserService = require("../services/UserService")
const ProductService = require("../services/ProductService")

module.exports = {
    getUserInforOwn: async (req, res) => {
        try {
            const { userId, isAdmin } = req?.decodeToken
            const userFound = await UserService.getUserById(userId)
            if (!userFound) {
                return res.status(400).json({
                    message: "not found user"
                })
            }

            return res.status(200).json({
                message: "ok",
                userData: userFound
            })

        } catch (error) {
            console.log("err when getUserInforOwn : ", error)
        }
    },
    getListProduct: async (req, res) => {
        try {
            const products = await ProductService.getAllProducts()
            return res.status(200).json({
                message: "ok",
                products
            })

        } catch (error) {
            console.log("err when getListProduct : ", error)
            return res.status(500).json({
                message: "have wrong!"
            })
        }
    },
    getProductById: async (req, res) => {
        try {
            const productId = req.params.productId
            if (!productId) {
                return res.status(400).json({
                    message: "productId invalid!"
                })
            }
            const product = await ProductService.getProductById(productId)
            if (!product) {
                return res.status(400).json({
                    message: 'not found product'
                })
            }
            return res.status(200).json({
                message: "ok",
                product
            })

        } catch (error) {
            console.log("err when getProductById : ", error)
            return res.status(500).json({
                message: "have wrong!"
            })
        }
    },
}