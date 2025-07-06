const controllerRoutesEnums = require("../CLIenums/controllerRoutesEnums")

module.exports = {
    "POST /api/login": controllerRoutesEnums.AuthController.login,
    "POST /api/register": controllerRoutesEnums.AuthController.register
}
