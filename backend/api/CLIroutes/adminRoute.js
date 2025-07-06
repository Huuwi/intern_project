const controllerRoutesEnums = require("../CLIenums/controllerRoutesEnums")

module.exports = {
    "GET /api/admin/getListUsers": controllerRoutesEnums.AdminController.getListUsers,
    "DELETE /api/admin/deleteUserById": controllerRoutesEnums.AdminController.deleteUserById,
    "DELETE /api/admin/deleteProductById": controllerRoutesEnums.AdminController.deleteProductById,
    "POST /api/admin/addNewProduct": controllerRoutesEnums.AdminController.addNewProduct,
    "PUT /api/admin/updateProduct": controllerRoutesEnums.AdminController.updateProduct,
}
