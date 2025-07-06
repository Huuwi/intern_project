const controllerRoutesEnums = require("../CLIenums/controllerRoutesEnums")

module.exports = {
    "GET /api/user/getUserInforOwn": controllerRoutesEnums.UserController.getUserInforOwn,
    "GET /api/user/getListProduct": controllerRoutesEnums.UserController.getListProduct,
    "GET /api/user/getProductById/:productId": controllerRoutesEnums.UserController.getProductById

}

