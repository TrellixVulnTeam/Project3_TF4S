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

    console.log('Server running!')
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
    res.header("Access-Control-Allow-Private-Network","*").send("hello world");
});

app.route('/api/twitter').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'tweets');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

app.route('/api/Graphs').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'Graphs');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})


app.route('/api/symptoms').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'symptoms');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})



///youtube API
app.route('/api/youtube/fox13').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'fox13');
    console.log("working");
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

app.route('/api/youtube/tampa10').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'tampa10');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

app.route('/api/youtube/abcAction').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'abcAction');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

app.route('/api/youtube/wfla8').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'wfla8');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

app.route('/api/youtube/general').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'general');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

//forum routing
const uri = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let gfs, gridfsBucket;

const conn = mongoose.createConnection(uri);
conn.once('open', () =>
{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'postImages/'
    });
    //initialize stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('postImages/')

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

app.post('/api/forum/submit', upload.single('file'), async function (req, res) {

    console.log(req.body);
    const results = await require('./mongoAccess.js').writeTextForumPost("jollyranchers", 'forumPosts', req.body) ;


})

app.route('/api/forum/posts').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo(client, "jollyranchers",'forumPosts');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

app.route('/api/forum/posts/images/:filename').get(async (req, res) =>
{

    gfs.files.findOne({filename: req.params.filename}, (err, file) =>{
       if(!file || file.length === 0)
       {
           return res.header("Access-Control-Allow-Private-Network","*").status(404).json({err: "No file exists"});
       }

       if(file.contentType === 'image/jpeg' || file.contentType === 'img/png')
       {
           const readStream = gridfsBucket.openDownloadStream(file._id);
           readStream.pipe(res);
       }
       else
       {
           return res.header("Access-Control-Allow-Private-Network","*").status(404).json({err: "Not an image file"});
       }
    });
})

//spotify routing
app.route('/api/spotify').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'podcasts');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

app.route('/api/sensorData').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers", 'sensorData');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
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



    console.log(year + "-" + month + "-" + date + "-" + hours + ":" + minutes + ":" + seconds)
    return (year + "-" + month + "-" + date + "-" + hours + ":" + minutes + ":" + seconds);
}