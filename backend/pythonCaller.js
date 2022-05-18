let {PythonShell} = require('python-shell')
const path = require("path");

//Used to call API of all collected data sources that were coded in Python.
//Author: Robert Kleszczynski, Fehmi Neffati

/*
IMPORTANT:
All print statements with string values MUST be encoded to utf-8 to successfully be run in Node.js

Any print statements of dictionary elements MUST be commented out  before deploying to server
These print statements will cause errors otherwise
 */
let checker = 0;
let currentDir = path.dirname(__filename);
let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: currentDir,
    args: []
};

//calls python script
//https://stackoverflow.com/questions/23450534/how-to-call-a-python-function-from-node-js
PythonShell.run('twitter_requests.py', null, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    checker++;
    console.log('results: %j', results);
    console.log("Checked through: ", checker);
});