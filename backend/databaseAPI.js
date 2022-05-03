const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser')


const cors = require('cors');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


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
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'tweets');
    res.send(results);
})

app.route('/api/symptoms').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'symptoms');
    res.send(results);
})



//youtube API
app.route('/api/youtube/fox13').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'fox13');
    console.log("working");
    res.send(results);
})

app.route('/api/youtube/tampa10').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'tampa10');
    res.send(results);
})

app.route('/api/youtube/abcAction').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'abcAction');
    res.send(results);
})

app.route('/api/youtube/wfla8').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'wfla8');
    res.send(results);
})

app.route('/api/youtube/general').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'general');
    res.send(results);
})

//forum routing
app.post('/api/forum/submit', urlencodedParser, function (req, res)
{
    console.log(req.body);
    if(!req.body.text)
    {console.log("text field is empty");}
    else if (!req.body.location)
    {
        console.log("location field is missing");
    }
    else
    {
        if(req.body.file)
        {
            //TODO: Need to process the image here somehow
            const results = require('./mongoAccess.js').writeSingleDataEntry("jollyranchers",'forumPosts', req.body);
        }
        else
        {
            const results = require('./mongoAccess.js').writeSingleDataEntry("jollyranchers",'forumPosts', req.body);
        }

        res.send('Submitted from' + req.body.location)
    }

})

app.route('/api/forum/posts').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'forumPosts');
    res.send(results);
})

//spotify routing
app.route('/api/spotify').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'podcasts');
    res.send(results);
})

app.route('/api/sensorData').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers", 'sensorData');
    res.send(results);
})
