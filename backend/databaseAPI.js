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

/////Database API manages all the routing for the backend as well as backend method calls to mongo
//In order to post forum posts to the Database, it uses a gridfs-stream as well as file submission through the use of multer
//All requests are called from App-service.service.ts
//All requests are relayed to mongoAccess.js for database operations

//Author: Robert Kleszczynski unless labelled otherwise



//uses bodyParser for form submission and Cors options set to allow site access from other scripts
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

let app = express();

//Change the string to 'localBuild' for LocalHosting
//Change the string to 'serverBuild' for AWS hosting
app.use(express.static('serverBuild'));
//app.use(express.static('localBuild'));

app.use(cors(corsOptions), bodyParser.json(), methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: false
}));


//listens on port 8000 for all backend calls
app.listen(8000, () => {

    console.log('Server running!')
})


//@route GET
//@desc sends back basic hello message on main page for testing connection
app.route('/').get( async (req, res) =>
{
    res.header("Access-Control-Allow-Private-Network","*").send("hello world");
});

//@route GET
//@desc Retrieves Twitter tweet data from MongoDB
app.route('/api/twitter').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'tweets');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})


//@route GET
//@desc Retrieves Graph data from MongoDB
//Author: Fehmi Neffati
app.route('/api/Graphs').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'Graphs');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

//@route GET
//@desc: Retrieves the date that the database was last updated
//Author: Fehmi Neffati
app.route('/api/lastUpdate').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'lastUpdate');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

//@route GET
//@desc Retrieves Symptom data from MongoDB. I.e. health guidelines, symptoms, etc.
app.route('/api/symptoms').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'symptoms');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})



//@route GET
//@desc Retrieves Youtube video data of the fox13 Youtube channel from MongoDB, including URL links
app.route('/api/youtube/fox13').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'fox13');
    console.log("working");
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

//@route GET
//@desc Retrieves Youtube data from channel Tampa10  from MongoDB
app.route('/api/youtube/tampa10').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'tampa10');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

//@route GET
//@desc Retrieves Youtube data from channel abcAction from MongoDB
app.route('/api/youtube/abcAction').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'abcAction');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

//@route GET
//@desc Retrieves Youtube data from wfla8 from MongoDB
//might be unused, there wasn't much on Youtube from this channel
app.route('/api/youtube/wfla8').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'wfla8');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

//@route GET
//@desc Retrieves Youtube data from more generic source (i.e "What is Red Tide?" kinds of videos as well as videos
// from misc users from MongoDB
app.route('/api/youtube/general').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("youtubeData",'general');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

/////////////////////////////////Forum routing
//How gridfs and multer work for file uploads
//https://www.youtube.com/watch?v=3f5Q9wDePzY

//This block of code sets up a Mongoose connection for Gridfs, which allows us to make image file submissions through Gridfs
//to store onto the database
const uri = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let gfs, gridfsBucket;

//connect to database with mongoose
//https://stackoverflow.com/questions/45272404/retrieve-mongodb-driver-db-from-mongoose
const conn = mongoose.createConnection(uri);
conn.once('open', () =>
{
    //initialize gridfs bucket
    ///https://stackoverflow.com/questions/69055292/error-grid-mongo-gridstore-is-not-a-consstructor-using-mongoose-grid-fs-strea
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'postImages/'
    });
    //initialize stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('postImages/')

    //create new storage engine

    // all set!
})

//This block of code dictates a storage destination for multer to use as well as what to name files
let postNumber = 1; //keeps a counter to keep track of which image goes to each post, will use Date timestamps for this
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





//use upload.array for multiple file upload, single for a single image like here

//@post Stores forum Posts with Image submission
//@desc uploads forum post to database and uses Multer to store the image separately
//Param:
// upload.single('file') : takes the fule submitted through front end and uploads to database
app.post('/api/forum/submitImg', upload.single('file'), function (req, res)
{
    const results = require('./mongoAccess.js').writeImgForumPost("jollyranchers",'forumPosts', req.body,  postNumber);
})

//@post Stores forum posts without Image submission (i.e. text only submissions)
//@desc Stores text only posts to MongoDB "forumPosts" database.
//Param:
// upload.none() : means we are only updating the text-based form data from the front end and are not adding any pictures
app.post('/api/forum/submit', upload.none(), async function (req, res) {
    console.log(req.body);
    const results = await require('./mongoAccess.js').writeTextForumPost("jollyranchers", 'forumPosts', req.body) ;
})

//@route GET
//@desc Retrieves all Forum posts from MongoDB
app.route('/api/forum/posts').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'forumPosts');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

//@route GET
//@desc Retrieves Forum images from MongoDB. This is called separately from retrieving forum posts
//as not all forum posts have associated images
//https://stackoverflow.com/questions/34921171/display-images-from-gridfs-mongodb
//Param:
// filename : the unique identifier stored in the forum post that will identify which picture is tied to that target forum post
app.route('/api/forum/posts/images/:filename').get(async (req, res) =>
{

    gfs.files.findOne({filename: req.params.filename}, (err, file) =>{
       if(!file || file.length === 0)
       {
           return res.header("Access-Control-Allow-Private-Network","*").status(404).json({err: "No file exists"});
       }

       //opens up a gridfs stream if the file is a jped or png
       if(file.contentType === 'image/jpeg' || file.contentType === 'img/png')
       {
           //https://github.com/aheckmann/gridfs-stream
           const readStream = gridfsBucket.openDownloadStream(file._id);
           readStream.pipe(res);
       }
       else
       {
           return res.header("Access-Control-Allow-Private-Network","*").status(404).json({err: "Not an image file"});
       }
    });
})

//@route GET
//updates likeCount of respective forum Post(found by  _id property) with new amount
//Param:
//postId: the unqiue _id property of the post to be used as the ientifier of the post
//likeCount: the new value of the like count that we wish toe update the database with
app.route('/api/forum/posts/likes/:postId/:likeCount').get(async (req,res) =>{

    const result = await require('./mongoAccess.js').updateLikeCount(req.params.postId, req.params.likeCount);
    res.header("Access-Control-Allow-Private-Network","*").send("working");
})

//@route GET
//@desc Retrieves Spotify data from MongoDB
app.route('/api/spotify').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers",'podcasts');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})

//UNUSED
//@route GET
//@desc Retrieves Sensor data from MongoDB
app.route('/api/sensorData').get(async (req, res) => {
    const results = await require('./mongoAccess.js').getDatabaseInfo("jollyranchers", 'sensorData');
    res.header("Access-Control-Allow-Private-Network","*").send(results);
})



//WARNING: This has potential flaws for high traffic usage if multiple posts are submitted per second, although this was
//not considered to be a problem as the server bandwidth would likely not be able to keep up with that volume of traffic.

//Returns a URL friendly timestamp with which we name image files and store a reference in the forum posts
//Is used as a unique identifier for each image posted based on the date and time it was posted
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

