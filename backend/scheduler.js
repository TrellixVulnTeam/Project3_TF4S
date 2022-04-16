const cron = require('node-cron')
const shell = require('shelljs')

//need to install some packages in terminal:
// npm i node-cron shelljs
//before running this file

let counter = 0;
cron.schedule('* * * * * *', function(){
    counter = counter + 1;
    console.log("scheduled task running: " + counter + " tiimes");
})