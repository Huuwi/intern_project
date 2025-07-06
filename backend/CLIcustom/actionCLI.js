const fs = require('fs')
const path = require("path")
const helperCLI = require("./helperCLI")
const chalk = require("chalk");
const constants = require("./constants")

const root = process.cwd();

//init custom struct
const init = () => {
    //1.check folder CLIenums && CLIpolicies and init sapmle

    //create path
    const CLIenumsFolder = path.join(root, "api/CLIenums");
    const CLIpoliciesFolder = path.join(root, "api/CLIpolicies");
    const controllersFolder = path.join(root, "api/controllers");

    //check folder CLIenumsFolder
    if (!fs.existsSync(CLIenumsFolder)) {
        fs.mkdirSync(CLIenumsFolder, { recursive: true });
    }

    //check folder CLIpoliciesFolder and init sample
    if (!fs.existsSync(CLIpoliciesFolder)) {
        fs.mkdirSync(CLIpoliciesFolder, { recursive: true });
    }
    fs.writeFileSync(path.join(CLIpoliciesFolder, "ACLIsample1Policies.js"), constants.CLIsamplePolicies1); //add A character to name to bubble file on the top of folder
    fs.writeFileSync(path.join(CLIpoliciesFolder, "ACLIsample2Policies.js"), constants.CLIsamplePolicies2);

    //init ACLIsampleController.js
    //check folder
    if (!fs.existsSync(controllersFolder)) {
        fs.mkdirSync(controllersFolder, { recursive: true });
    }
    //sample
    fs.writeFileSync(path.join(controllersFolder, "ACLIsampleController.js"), constants.ACLIsampleController);

    //2.check folder CLIroutes , init indexRoutes , add text to config/routes.js , init sample
    const CLIroutesFolder = path.join(root, "api/CLIroutes");
    if (!fs.existsSync(CLIroutesFolder)) {
        fs.mkdirSync(CLIroutesFolder, { recursive: true });
    }

    // init indexRoutes.js
    const indexRoutesPath = path.join(CLIroutesFolder, "indexRoutes.js");
    if (!fs.existsSync(indexRoutesPath)) {
        fs.writeFileSync(indexRoutesPath, constants.indexRoutesSample);
    }

    // Add text to config/routes.js if not already present
    const configRoutesPath = path.join(root, "config/routes.js");

    // Texts to insert
    const importText = `// CLIcustom: Import CLIroutes\nconst indexRoutes = require("../api/CLIroutes/indexRoutes")\n`;
    const spreadRoutesText = `  ...indexRoutes,\n`;

    if (fs.existsSync(configRoutesPath)) {
        let routesContent = fs.readFileSync(configRoutesPath, "utf8");

        // Add import at top of file if not already present
        if (!routesContent.includes("CLIcustom: Import CLIroutes")) {
            routesContent = importText + routesContent;
        }

        // Add spread inside module.exports.routes
        const exportRoutesPattern = /module\.exports\.routes\s*=\s*{([\s\S]*?)}/m;
        if (exportRoutesPattern.test(routesContent) && !routesContent.includes("...indexRoutes")) {
            routesContent = routesContent.replace(exportRoutesPattern, (match, innerContent) => {
                return `module.exports.routes = {\n${spreadRoutesText}${innerContent}}`;
            });
        }

        // Save the modified content
        fs.writeFileSync(configRoutesPath, routesContent, "utf8");
    }

    // init sample route file
    const sampleRoutePath = path.join(CLIroutesFolder, "ACLIsampleRoute.js");
    if (!fs.existsSync(sampleRoutePath)) {
        fs.writeFileSync(sampleRoutePath, constants.CLIsampleRoute);
    }

    //3.add text to config/policies.js
    let filePath = path.join(root, "config/policies.js")
    //check filepath
    if (!fs.existsSync(filePath)) {
        console.error("policies.js file not found!");
        return;
    }

    //get content file
    let content = fs.readFileSync(filePath, "utf8");

    //create text to addd
    const import1 = `const policyEnums = require("../api/CLIenums/policyEnums");`;
    const import2 = `const controllerInforEnums = require("../api/CLIenums/controllerInforEnums");`;
    const insertBlock = `  [controllerInforEnums.ACLIsampleController.name]: {
    [controllerInforEnums.ACLIsampleController.methods.check]: policyEnums.ACLIsample1Policies.testSpamle1
  },`;

    // add import to oldContentFile if not exist
    if (!content.includes("policyEnums")) {
        content = `${import1}\n${import2}\n\n` + content;
    }

    // find postion of module.exports.policies = {
    const exportMatch = content.match(/module\.exports\.policies\s*=\s*{([\s\S]*?)}/);

    if (exportMatch) {
        const updatedPoliciesBlock = content.replace(
            /module\.exports\.policies\s*=\s*{([\s\S]*?)}/,
            (match, inner) => {
                if (match.includes("ACLIsampleController")) return match; // tránh thêm trùng
                return `module.exports.policies = {\n${insertBlock}\n${inner}}`;
            }
        );

        fs.writeFileSync(filePath, updatedPoliciesBlock, "utf8");
        console.log("policies.js updated successfully.");
    } else {
        console.error("Could not find module.exports.policies = { ... } in the file.");
    }

    genControllerEnums()
    genPolicyEnums()

    console.log(chalk.bgGreenBright("CLI init successfully"))

}

const genControllerEnums = () => {

    const controllerFolder = path.join(root, "/api/controllers")

    let controller_routes_enums = {} //use for routes
    let controller_infor_enums = {} //get infor of controllers

    //read all file in ../controller folder include "Controller.js"
    let filenames = fs.readdirSync(controllerFolder)
    filenames = filenames.filter((filename) => {
        return filename.endsWith("Controller.js")
    })

    //loop throught all files
    for (let filename of filenames) {

        filename = filename.replace(".js", "")

        //require obj from file
        let objController = require(`${controllerFolder}/${filename}.js`)

        //check exist of filename and init value
        if (!controller_routes_enums[filename]) {
            controller_routes_enums[filename] = {}
        }
        if (!controller_infor_enums[filename]) {
            controller_infor_enums[filename] = {}
            controller_infor_enums[filename].name = filename
            controller_infor_enums[filename].methods = {}
        }

        //add properties to controller_routes_enums
        for (let key of Object.keys(objController)) {
            controller_routes_enums[filename][key] = `${filename}.${key}`
        }

        //add properties to controller_infor_enums
        for (let key of Object.keys(objController)) {
            controller_infor_enums[filename].methods[key] = key.toString()
        }
    }

    //create fileContent controller_routes_enums
    const fileContent1 =
        'module.exports = ' +
        JSON.stringify(controller_routes_enums, null, 2) +
        ';\n';

    //write file controller_routes_enums when run
    fs.writeFileSync("./api/CLIenums/controllerRoutesEnums.js", fileContent1)

    //create fileContent controller_infor_enums
    const fileContent2 =
        'module.exports = ' +
        JSON.stringify(controller_infor_enums, null, 2) +
        ';\n';

    //write file controller_infor_enums when run
    fs.writeFileSync("./api/CLIenums/controllerInforEnums.js", fileContent2)

    console.log(chalk.bgGreenBright("genControllerEnums successfully"))

}


const genPolicyEnums = () => {
    const CLIpoliciesFolder = path.join(root, "api/CLIpolicies")
    const outputPolicyFolder = path.join(root, "api/policies")

    let policy_enums = {}

    //read all file in CLIpoliciesFolder folder include "Policies.js"
    let filenames = fs.readdirSync(CLIpoliciesFolder)
    filenames = filenames.filter((filename) => {
        return filename.endsWith("Policies.js")
    })

    //loop throught all files
    for (let filename of filenames) {

        filename = filename.replace(".js", "")

        //check exist of filenamePorperties
        if (!policy_enums[filename]) {
            policy_enums[filename] = {}
        }


        //require file => extract policies => write file extract contentFile => add to enum

        //require file
        const relativePath = `${CLIpoliciesFolder}/${filename}.js`
        let objPolicies = require(relativePath) //include all policies by typename

        let textRequireLibs = helperCLI.getFilePreamble(relativePath)

        for (let property of Object.keys(objPolicies)) {

            try {
                //1.write file 

                const newFileNameGen = `${filename}__${property}__policy.js` //filename
                const newFileContentGen = `${textRequireLibs}\n${helperCLI.convertToModuleExport(objPolicies[property])}` //content
                fs.writeFileSync(path.join(outputPolicyFolder, newFileNameGen), newFileContentGen) //write file

                //2.create enum
                //add property to enum
                policy_enums[filename][property] = `${filename}__${property}__policy`

            } catch (error) {
                console.log(chalk.bgYellow('err when run in file : ' + filename));
                console.log("err when genpolicy : ", error);
            }
        }
    }
    //create enumFileContent
    const enumFileContent =
        'module.exports = ' +
        JSON.stringify(policy_enums, null, 2) +
        ';\n';

    //write file when run
    fs.writeFileSync("./api/CLIenums/policyEnums.js", enumFileContent)

    console.log(chalk.bgGreenBright("genPolicyEnums successfully"))

}



const actions = {
    init, genControllerEnums, genPolicyEnums
}

module.exports = actions