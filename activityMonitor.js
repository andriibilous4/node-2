const fs = require('node:fs');
const childProcess = require('node:child_process');

const command = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';

let fileData = {};

const execProcess = (command) => {
  return new Promise((resolve,reject)=>{
    childProcess.exec(command, (error, stdout, stderr) => {
      if(error === null){
        resolve(stdout);
      } else {
        reject(error)
      }
    });
  })
};

setInterval(async ()=>{
  const result = await execProcess(command);
  fileData = {
    [Date.now()]: result
  };
    console.log(result);
},1000)

setInterval(()=>{
  fs.appendFile('activityMonitor.log', `${JSON.stringify(fileData)}\n`, (err) => {
    if (err) throw err;
  });
},600)


