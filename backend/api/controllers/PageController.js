const ProductService = require("../services/ProductService")

module.exports = {
    pagination: async (req, res) => {
        try {
            const pageIndex = Number(req.query.pageIndex)
            const perPage = Number(req.query.perPage)

            if ((!pageIndex && pageIndex !== 0) || (!perPage && perPage !== 0)) {
                return res.status(400).json({
                    message: "missing data"
                })
            }

            if (pageIndex < 0 || perPage < 0) {
                return res.status(400).json({
                    message: "data invalid"
                })
            }

            const skip = perPage * pageIndex

            const productList = await ProductService.pagination(skip, perPage)

            return res.status(200).json({
                message: "ok",
                productList
            })
        } catch (error) {
            console.log("err when pagination : ", error)
            return res.status(500).json({
                message: "have wrong!"
            })
        }
    },

    searchProductByName: async (req, res) => {
        try {
            const productName = req.body.productName
            if (!productName) return res.status(400).json({ message: "missing data" })
            const products = await ProductService.findProductByName(productName)
            return res.status(200).json({
                message: "ok",
                products
            })
        } catch (error) {
            console.log("err when searchProductByName : ", error)
            return res.status(500).json({
                message: "have wrong!"
            })
        }
    },

}







