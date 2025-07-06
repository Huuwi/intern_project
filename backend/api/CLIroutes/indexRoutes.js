const fs = require('fs');
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
