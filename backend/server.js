//server.js
var express = require('express');
const cron = require('node-cron');
const shell = require('shelljs');

//to get this working, run this script in pm2 start server.js when connected to server

var app = express();

let counter = 0;
cron.schedule('27 1 * * *', function(){
    counter = counter + 1;
    //console.log("scheduled task running: " + counter + " tiimes");
}, {
    timezone: "America/New_York"
});


app.get('/', function(req, res) {
    res.send('Daily Midnight check updated ' + counter + 'times');
})
var server = app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})