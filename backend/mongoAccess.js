const { MongoClient, ServerApiVersion } = require('mongodb');
const {mongo} = require("mongoose");
const Grid = require("gridfs-stream");
var fs = require('fs');



const uri = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let gfs; //init gridfs-stream

module.exports = {
    getDatabaseInfo: async function (databaseName, collectionName)
    {

        try {

            await client.connect();
            const cursor = await client.db(databaseName).collection(collectionName).find({});

            const result = await cursor.toArray();
            console.log(result);
            if (result)
            {
                result.forEach((r, i) => {

                    //  console.log();
                    // console.log(`_id: ${r._id}`);
                });

                return result;
            }
            else {
                console.log("not found")
                //console.log(`No listings found with name '${nameOfListing}'`);
            }

        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    },

    writeTextForumPost: async function (databaseName, collectionName, entry)
    {
        try {

            await client.connect();
            const result = await client.db(databaseName).collection(collectionName).insertOne(entry);

            console.log(`New Listing Created id: ${result.insertedId}`);

        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    },

    writeImgForumPost: async function (databaseName, collectionName, entry, postNumber)
    {
        try {

            await client.connect();
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
            await client.close();
        }
    }
}