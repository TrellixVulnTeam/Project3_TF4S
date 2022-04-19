//server.js
var express = require('express');
const cron = require('node-cron');
const shell = require('shelljs');
const PythonShell = require('python-shell');


//to get this working, run this script in pm2 start server.js when connected to server

var app = express();

let counter = 0;
cron.schedule('40 10 * * *', function(){
    counter = counter + 1;
    //console.log("scheduled task running: " + counter + " tiimes");
}, {
    timezone: "America/New_York"
});

let options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '',
    args: []
};


app.get('/', function(req, res)
{
    PythonShell.run('twitter_requests.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });

    res.send('Daily Midnight check updated ' + counter + 'times');
})
var server = app.listen(8080, function()
{
    console.log("Backend Application listening at http://localhost:8080")
})