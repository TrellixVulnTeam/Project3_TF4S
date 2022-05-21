import {PythonShell} from "python-shell";

const cron = require('node-cron')
const shell = require('shelljs')
import { updateYoutubeDB } from './youTubeToDB' //used for changing from localHost to AWS use

//Used to run a scheduled task daily.
//Author: Robert Kleszczynski, Fehmi Neffati


//IMPORTANT: need to install some packages in terminal:
// npm i node-cron shelljs
//before running this file

let counter = 0;

//This code runs daily at midnight
//Scheduler code by Robert Kleszczynski
cron.schedule('0 0 * * * *', function(){
    counter = counter + 1;
    updateYoutubeDB();

    //Author: Fehmi Neffati
    PythonShell.run('Butler.py', null, function (err, results) {
        if (err) throw err;
    });


    console.log("scheduled task running: " + counter + " times");

    //uncomment to call update to youtubeDB

    },{

    timezone: "America/New_York" //easter time zone

    })
