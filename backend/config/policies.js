const policyEnums = require("../api/CLIenums/policyEnums");
const controllerInforEnums = require("../api/CLIenums/controllerInforEnums");



module.exports.policies = {

  [controllerInforEnums.UserController.name]: {
    "*": policyEnums.UserPolicies.checkUser
  },
  [controllerInforEnums.AdminController.name]: {
    "*": policyEnums.AdminPolicies.checkAdmin
  }


};
