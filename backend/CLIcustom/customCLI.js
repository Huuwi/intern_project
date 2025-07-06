#!/usr/bin/env node

const fs = require("fs")
const { program } = require('commander');
const actions = require("./actionCLI")
const chalk = require("chalk")

console.log(chalk.bgBlue("Note : Make sure change dicrectory to root before use myCLI!!!"))
console.log()

//create name and des for CLI
program
    .name("myCLI")
    .description("my custom CLI")
    .version("1.0.0")


//init custom struct
program
    .command('init')
    .description("init custom struct")
    .action(actions.init)


//generate controller enums
program
    .command('genControllerEnums')
    .description("genControllerEnums for more esaier to use")
    .action(actions.genControllerEnums)

//generate policy enums
program
    .command("genPolicyEnums")
    .description("genPolicyEnums for more esaier to use")
    .action(actions.genPolicyEnums)


//gen auto
program
    .command("gen")
    .description("gen controllers and policies")
    .action(() => {
        actions.genControllerEnums()
        actions.genPolicyEnums()
    })

program.parse(process.argv);


