const { MongoClient, ServerApiVersion, ObjectID, ObjectId} = require('mongodb');
const {mongo} = require("mongoose");

//These methods are called from the API to access and make requests of the database, including:
// finding collections and writing forum posts
//All calls are made from databaseAPI.js
//Author: Robert Kleszczynski


//Connects to our Mongo Database
//http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
const uri = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect();

module.exports = {
    //Called anytime we wish to get collection data from MongoDB
    //Params:
    // databaseName: the name of the database you wish to access
    // collectionName: the name of the collection in the database you wish to access
    getDatabaseInfo: async function ( databaseName, collectionName)
    {

        try {

           //Gets our collection data
            const cursor = await client.db(databaseName).collection(collectionName).find({});

            const result = await cursor.toArray();
            console.log(result);
            if (result)
            {
                //prints elements in the database in case we need to test for something
                /*result.forEach((r, i) => {

                      console.log();
                     console.log(`_id: ${r._id}`);
                });*/

                return result;
            }
            else {
                console.log("not found")
                //console.log(`No listings found with name '${nameOfListing}'`);
            }

        } catch (e) {
            console.error(e);
        } finally {

        }
    },


    //Creates a text-only forum post in the "forumPosts" collection of the database.
    //Called when user clicks to submit a Forum Post. THis is called when an image is not submitted.
    //Param:
    // databaseName: name of database to create a new listing
    // collectionName: name of collection in the selected database to create a new listing
    // entry : the content we will use to create a new element in the collection
    writeTextForumPost: async function (databaseName, collectionName, entry)
    {
        try {

            //await client.connect();
            const result = await client.db(databaseName).collection(collectionName).insertOne(entry);

            console.log(`New Listing Created id: ${result.insertedId}`);

        } catch (e) {
            console.error(e);
        } finally {
           // await client.close();
        }
    },

    //Creates a forum post with image in the "forumPosts" collection of the database.
    //Called when user clicks to submit a Forum Post. THis is called when an image is submitted.
    //Param:
    // databaseName: name of database to create a new listing
    // collectionName: name of collection in the selected database to create a new listing
    // entry : the content we will use to create a new element in the collection
    // postNumber: used as a unique identifier to ID which images belong to which posts
    writeImgForumPost: async function (databaseName, collectionName, entry, postNumber)
    {
        try {

            //await client.connect();
            entry[ 'postNumber' ] = postNumber;
            const result = await client.db(databaseName).collection(collectionName).insertOne(entry);
            console.log(`New Listing Created id: ${result.insertedId}`);

            /* var imageAsBase64 = fs.readFileSync( image.path.toString(),'base64');
             console.log(imageAsBase64);
            */

            /*const db = new mongo.Db('jollyranchers', new mongo.Server("127.0.0.1", 27017));
            gfs = Grid(db, mongo);

            // streaming to gridfs
            var writeStream = gfs.createWriteStream({
                filename: result.insertedId
            });
            fs.createReadStream('forumImages').pipe(writestream);*/
        } catch (e) {
            console.error(e);
        } finally {
           // await client.close();
        }
    },

    async updateLikeCount(postID, likeCount) {
        try {
           // console.log(postID);
            //Gets our collection data
            const coll= await client.db("jollyranchers").collection("forumPosts");
            let cursor = coll.updateOne({_id: ObjectID(postID)}, {$set : { likeCount: likeCount }}, {upsert : true} );


            console.log("found result");


          /*  const result = await client.db("jollyRanchers").collection("forumPosts").update({"_id": ObjectID(postID)},
                {$inc: { likeCount: 1 }});


            console.log(result);*/
            if (result) {
                //prints elements in the database in case we need to test for something
                /*result.forEach((r, i) => {

                      console.log();
                     console.log(`_id: ${r._id}`);
                });*/

                return result;
            } else {
                console.log("not found")
                //console.log(`No listings found with name '${nameOfListing}'`);
            }

        } catch (e) {
            console.error(e);
        } finally {

        }
    }
}