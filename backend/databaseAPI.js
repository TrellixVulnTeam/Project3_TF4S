const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser')


const cors = require('cors');


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

let app = express();
app.use(cors(corsOptions), bodyParser.json())

//listens on port 800 for stuff
app.listen(8000, () => {
    console.log('Server started!')
})

//example post method
/*
app.route('/api/cats').post((req, res) => {
    res.send(201, req.body)
})*/

app.route('/api/twitter').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo('tweets');
    res.send(results);
})

app.route('/api/symptoms').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo('symptoms');
    res.send(results);
})

app.route('/api/youtube').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo('youtube');
    res.send(results);
})

app.route('/api/spotify').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo('spotify');
    res.send(results);
})

app.route('/api/sensorData').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo('sensorData');
    res.send(results);
})
