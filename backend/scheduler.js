const cron = require('node-cron')
const shell = require('shelljs')

//Used to run a scheduled task daily.
//Author: Robert Kleszczynski


//IMPORTANT: need to install some packages in terminal:
// npm i node-cron shelljs
//before running this file

let counter = 0;

//This code runs daily at 10:31 AM (for now)
cron.schedule('31 10 * * * *', function(){
    counter = counter + 1;
    //console.log("scheduled task running: " + counter + " tiimes");
},{

    timezone: "America/New_York" //easter time zone

})