const controllerRoutesEnums = require("../CLIenums/controllerRoutesEnums")

module.exports = {
    "GET /api/admin/getListUsers": controllerRoutesEnums.AdminController.getListUsers,
    "POST /api/admin/addNewUser": controllerRoutesEnums.AdminController.addNewUser,
    "DELETE /api/admin/deleteUserById": controllerRoutesEnums.AdminController.deleteUserById,
    "DELETE /api/admin/deleteProductById": controllerRoutesEnums.AdminController.deleteProductById,
    "POST /api/admin/addNewProduct": controllerRoutesEnums.AdminController.addNewProduct,
    "PUT /api/admin/updateProduct": controllerRoutesEnums.AdminController.updateProduct,
}
