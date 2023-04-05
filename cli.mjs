#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const inquirer = require("inquirer");
// 人机交互的js库
//注意：最新版默认使用ESM,如果要使用CMD请安装早期版本，如8.0.0
// 官网：https://github.com/SBoudrias/Inquirer.js/
inquirer
  .prompt([
    {
      type: "input", //类型：input，number，confirm，checkbox,list....
      message: "your project name:", //控制台的对话消息
      name: "name",
      default: "my-app",
    },
  ])
  .then((answer) => {
    const curDir=process.cwd()
    //process.cwd() 是当前执行node命令时候的文件夹地址——工作目录。
    // __dirname 是被执行的js 文件的地址——文件所在目录。
   
    const destDir=path.join(__dirname,'templates')
  
    fs.readdir(destDir,(err,files)=>{
        if(err) throw err;
        files.forEach(file=>{
            ejs.renderFile(path.join(destDir,file),answer).then(data=>{
                fs.writeFileSync(path.join(curDir,file),data)
            })
        })
    })
  });
