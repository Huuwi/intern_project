
let CLIsamplePolicies1 = `const CLIsamplePolicies1 = {
    testSpamle1: (req, res, next) => {
        let check = req.params?.check
        check = Number(check)
        return Boolean(check) ? next() : res.forbidden()
    },
    validatorSpamle1: function (req, res, next) {
        //writting some logic ...
        next()
    }
}

module.exports = CLIsamplePolicies1
`

let CLIsamplePolicies2 = `const CLIsamplePolicies2 = {
    testSpamle2: (req, res, next) => {
       //writting some logic ...
        next()
    },
    validatorSpamle2: function (req, res, next) {
        //writting some logic ...
        next()
    }
}

module.exports = CLIsamplePolicies2
`


let ACLIsampleController = `module.exports = {
    ping: function (req, res) {
        res.json({
            message: "pong"
        })
    },
    check: function (req, res) {
        res.json({
            message: "check ok"
        })
    },
}`

let indexRoutesSample = `const fs = require('fs');
const path = require('path');

// Object to store all exported route handlers
const indexRoutes = {};

// Read all files in the current directory
const routeFiles = fs.readdirSync(__dirname)
    // Only include files that end with 'Route.js' and exclude this index file
    .filter(filename => filename.endsWith('Route.js') && filename !== path.basename(__filename));

// Loop through each route file
routeFiles.forEach((route) => {
    const routeController = require(path.join(__dirname, route));

    // Merge all named exports from the route module into indexRoutes
    for (let key of Object.keys(routeController)) {
        indexRoutes[key] = routeController[key];
    }
});

module.exports = indexRoutes;
`

let CLIsampleRoute = `const controllerRoutesEnums = require("../CLIenums/controllerRoutesEnums")
module.exports = {
    'GET /CLI/sapmle/:check': controllerRoutesEnums.ACLIsampleController.check,
    'GET /CLI/ping': controllerRoutesEnums.ACLIsampleController.ping,
}`


let indexServices = ``


const constants = {
    CLIsamplePolicies1, CLIsamplePolicies2, ACLIsampleController, indexRoutesSample, CLIsampleRoute, indexServices
}

module.exports = constants