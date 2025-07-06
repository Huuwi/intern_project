const controllerRoutesEnums = require("../CLIenums/controllerRoutesEnums")

module.exports = {
    "GET /api/page/listProducts": controllerRoutesEnums.PageController.pagination,
    "POST /api/page/searchProductByName": controllerRoutesEnums.PageController.searchProductByName,
}