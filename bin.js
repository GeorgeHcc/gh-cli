#! /usr/bin/env node
const program=require("commander")

program
.version("1.0.0")
.command("create <app-name>")
.description("create a new project ")
.action((name)=>{
    console.log(`your project name is ${name}`);
})
program.parse()