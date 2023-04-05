#! /usr/bin/env node

const path=require("path")
const fs=require("fs-extra")
const inquirer=require("inquirer")
module.exports =async function (name, options) {
    // 验证是否正常取到值
    console.log('>>> create.js', name, options)
    const curDir=process.cwd()
    const targetDir=path.join(curDir,name)
    if(fs.existsSync(targetDir)){//判断目标文件夹是否存在
      if(options.force){//强制覆盖存在的文件夹
        await fs.remove(targetDir)
      }
      else{
        //询问用户是否强制覆盖
        let { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: 'Target directory already exists Pick an action:',
            choices: [
              {
                name: 'Overwrite',
                value: 'overwrite'
              },{
                name: 'Cancel',
                value: false
              }
            ]
          }
        ])
  
        if (!action) {
          return;
        } else if (action === 'overwrite') {
          // 移除已存在的目录
          console.log(`\r\nRemoving...`)
          await fs.remove(targetDir)
        }

      }
    }
  }