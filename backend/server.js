//server.js
var express = require('express');
const cron = require('node-cron');
const shell = require('shelljs');


var app = express();

let counter = 0;
cron.schedule('* * * * * *', function(){
    counter = counter + 1;
    //console.log("scheduled task running: " + counter + " tiimes");
})


app.get('/', function(req, res) {
    res.send('Hello World updated ' + counter + 'times');
})
var server = app.listen(8080, function() {
    console.log("Backend Application listening at http://localhost:8080")
})