//server.js
var express = require('express');
const cron = require('node-cron');
const shell = require('shelljs');
let {PythonShell} = require('python-shell')
const path = require("path");


//to get this working, run this script in pm2 start server.js when connected to server

let app = express();

let counter = 0;
let checker = 0;
let currentDir = path.dirname(__filename);
cron.schedule('34 10 * * *', function(){ //time  is in military time
    counter = counter + 1;
    //console.log("scheduled task running: " + counter + " tiimes" );
}, {
    timezone: "America/New_York"
});

let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: currentDir,
    encoding: "utf-8",
    args: []
};


app.get('/', function(req, res)
{
    PythonShell.run('twitter_requests.py', null, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        checker++;
        console.log('results: %j', results);
    });

    res.send('Daily Midnight check updated ' + counter + 'times' + checker);
})
var server = app.listen(8080, function()
{
    console.log("Backend Application listening at http://localhost:8080")
})