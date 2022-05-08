const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser')
const mongoose  = require('mongoose');

const methodOverride = require("method-override");
const cors = require('cors');
const {GridFsStorage} = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const Grid = require("gridfs-stream");



var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

let app = express();


app.use(cors(corsOptions), bodyParser.json(), methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: false
}));

//listens on port 800
app.listen(8000, () => {
    console.log('Server started!')
})

//example post method
/*
app.route('/api/cats').post((req, res) => {
    res.send(201, req.body)
})*/
//@route GET
//@desc sends back basic hello message when starting up
app.route('/').get( async (req, res) =>
{
    res.send("hello world");
});

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
const uri = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let gfs

const conn = mongoose.createConnection(uri);
conn.once('open', () =>
{
    //initialize stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('jollyranchers')

    //create new storage engine

    // all set!
})
let postNumber = 1; //keeps a counter to keep track of which image goes to each post
const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                postNumber = getDate();
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: postNumber,
                    bucketName: 'postImages/'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({storage: storage});




//@post /upload
//@desc uploads forum post to database
//use upload.array for multiple file upload, single for a single image like here

//maybe put this back in
// upload.single("file"),
app.post('/api/forum/submitImg', upload.single('file'), function (req, res)
{
    const results = require('./mongoAccess.js').writeImgForumPost("jollyranchers",'forumPosts', req.body,  postNumber);

       /* if(req.body.file)
        {
            //TODO: Need to process the image here somehow
            const results = require('./mongoAccess.js').writeSingleDataEntry("jollyranchers",'forumPosts', req);
        }
        else
        {
            const results = require('./mongoAccess.js').writeSingleDataEntry("jollyranchers",'forumPosts', req.body);
        }

        res.send('Submitted from' + req.body.location)*/


})

app.post('/api/forum/submit', async function (req, res) {

    console.log(req.body);
    const results = await require('./mongoAccess.js').writeTextForumPost("jollyranchers", 'forumPosts', req.body) ;


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

function getDate()
{
    let date_ob = new Date();

// current date
// adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

// current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
    let year = date_ob.getFullYear();

// current hours
    let hours = date_ob.getHours();

// current minutes
    let minutes = date_ob.getMinutes();

// current seconds
    let seconds = date_ob.getSeconds();



    console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds)
    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}