const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
//make sure the .env file is in the same directory when running this
const{google}= require('googleapis');

// Calls Youtube API to search for the top 50 results.
//Cleans results and sorts them by channel to 4 news channels in Florida and a General Red Tide Channel for red Tide explanations
//sorts results further by putting the most recent results first
//clears database collections and updates with latest results
async function main()
{
    var fox13 = [];
    var tampa10 = [];
    var abcAction = [];
    var wfla8 = [];
    var general = [];

    const uri = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


    let nestedSort;
    try {


        google.youtube('v3').search.list({
            key: process.env.YOUTUBE_TOKEN,
            part: "snippet",
            q: "Red Tide",
            maxResults: 50
        }).then(async (response) => {
            const {data} = response; //get just the search results part, no headers or request data
            //items holds all the video search data
            for (const item of data.items) {

                var added = false;
                //clean results and sort videos into separate arrays
                if (item.snippet.channelTitle === "FOX 13 Tampa Bay") {
                    //console.log("Fox 13 Added");
                    fox13.push(item);
                    added = true;
                } else if (item.snippet.channelTitle === "10 Tampa Bay") {
                    // console.log("Tampa10 Added");
                    tampa10.push(item);
                    added = true;
                } else if (item.snippet.channelTitle === "ABC Action News") {
                    //console.log("ABC Action Added");
                    abcAction.push(item);
                    added = true;
                } else if (item.snippet.channelTitle === "WFLA News Channel 8") {
                    //console.log("WFLA added");
                    wfla8.push(item);
                    added = true;

                } else {
                    let title = item.snippet.title;
                    title = title.toLowerCase();
                    let description = item.snippet.description;
                    description = description.toLowerCase();

                    if (!title.includes("music") && !title.includes("official") && !title.includes("lyrics")
                        && !title.includes("earth 8") && !title.includes("movie") && !title.includes("cape")
                        && !title.includes("russian") && !title.includes("remastered") && !title.includes("ahs")
                        && !title.includes("american horror story") && !title.includes("ft")
                        && !title.includes("crimson") && !title.includes("scene") && !description.includes("song")
                        && !description.includes("artist") && !description.includes("episode")) {
                        if (title.includes("florida") || title.includes("gulf")) {
                            //red tide stuff in florida
                            if (!added)
                                general.push(item);
                            //console.log(title);
                        } else if (title.includes("why") || title.includes("what is") || title.includes("science")
                            || title.includes("truth") || title.includes("impact")) {
                            if (!added)
                                general.push(item);
                            //console.log(title);
                        }
                    }
                }
            }


        }).catch((err) => console.log(err));

        //TODO: If Time permits, clean this up to make it more efficient
        //deletes all databases and repopulates them from latest API call
        await client.connect();
        //await listDatabases(client);
        await clearListings(client, "fox13");
        await clearListings(client, "tampa10");
        await clearListings(client, "abcAction");
        await clearListings(client, "wfla8");
        await clearListings(client, "general");

        //sorts by nested object if only prop1 is defined. if prop1 and prop2 are defined sorts nested objects
        nestedSort = (prop1, prop2 = null, direction = 'desc') => (e1, e2) => {
            const a = prop2 ? e1[prop1][prop2] : e1[prop1],
                b = prop2 ? e2[prop1][prop2] : e2[prop1],
                sortOrder = direction === "asc" ? 1 : -1
            return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
        };

        fox13.sort(nestedSort("snippet", "publishTime", "desc"));
        tampa10.sort(nestedSort("snippet", "publishTime", "desc"));
        abcAction.sort(nestedSort("snippet", "publishTime", "desc"));
        wfla8.sort(nestedSort("snippet", "publishTime", "desc"));
        general.sort(nestedSort("snippet", "publishTime", "desc"));

        //check publish time order
        //console.log(fox13);

        await createListings(client, "fox13", fox13);
        await createListings(client, "tampa10", tampa10);
        await createListings(client, "abcAction", abcAction);
        await createListings(client, "wfla8", wfla8);
        await createListings(client, "general", general);


    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }







}

main();




//this will take the sample Airbnb database and make a new document in it
async function createListings(client, collection, newListings)
{
    //accesses the sample_airbnb database on mongoDB
    //accesses the "ListingsAndReviews" table,
    //inserts a single document(the new listing) there
    const result = await client.db("youtubeData").collection(collection).insertMany(newListings);

    //these are NOT apostrophes, they are back ticks...(the key to the left of the 1 at the top of the keyboard)
    console.log(`${result.insertedCount} new listings created with the following ID (s):`)
    console.log(result.insertedIds)
}

async function clearListings(client, collection)
{
    await client.db("youtubeData").collection(collection).deleteMany({});
}

async function listDatabases(client)
{
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}
