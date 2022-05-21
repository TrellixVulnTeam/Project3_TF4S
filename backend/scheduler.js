import {PythonShell} from "python-shell";

const cron = require('node-cron')
const shell = require('shelljs')
import { updateYoutubeDB } from './youTubeToDB' //used for changing from localHost to AWS use

//Used to run a scheduled task daily.
//Author: Robert Kleszczynski


//IMPORTANT: need to install some packages in terminal:
// npm i node-cron shelljs
//before running this file

let counter = 0;

//This code runs daily at 10:31 AM (for now)
cron.schedule('37 0 * * * *', function(){
    counter = counter + 1;


    /*PythonShell.run('Butler.py', null, function (err, results) {
        if (err) throw err;
    });*/

    PythonShell.run('twitter_requests.py', null, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        checker++;
        console.log('results: %j', results);
        console.log("Checked through: ", checker);
    });

    PythonShell.run('GraphingHistoricalData.py', null, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        checker++;
        console.log('results: %j', results);
        console.log("Checked through: ", checker);
    });
    PythonShell.run('PodcastExtractor.py', null, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        checker++;
        console.log('results: %j', results);
        console.log("Checked through: ", checker);
    });
    PythonShell.run('SymptomsAndGuidelines.py', null, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        checker++;
        console.log('results: %j', results);
        console.log("Checked through: ", checker);
    });

    console.log("scheduled task running: " + counter + " times");

    //uncomment to call update to youtubeDB
    updateYoutubeDB();
    },{

    timezone: "America/New_York" //easter time zone

    })
