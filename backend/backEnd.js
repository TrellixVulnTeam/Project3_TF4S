const { MongoClient, ServerApiVersion } = require('mongodb');

async function main()
{
    const uri = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try{
        await client.connect();

        await listDatabases(client);

        //we can specify only a certain number of fields rather than all the fields if we want
      /*  await createListing(client, {
            name: "New French House",
            summary: "A charming place in Paris",
            bedrooms: 1,
            bathrooms: 1,
            _id: 999    //include this if you want to specify row numbers

        })*/

        //inserts 3 listings into the airbnb sample database
        await createMultipleListings(client, [{
            name: "loveley beach house",
            summary: "its on the beach"
        },
            {
                name: "Corn Shack",
                summary: "A house on a corn field"
            },
            {
                name: "My Crappy Dorm",
                summary: "This place is tiny"
            }])

    }
    catch(e)
    {
        console.error(e);
    }
    finally
    {
        await client.close();
    }

}

main().catch(console.error);

////HERE"s how MongoDB stores data:
// documents are treated as rows in a table
// //collections are treated like a table in a database
// //documents need an "_id" that is automatically created by index, but you can specify it yourself



//gets a list of databases from client server and prints them to console
async function listDatabases(client)
{
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


//this will take the sample Airbnb database and make a new document in it
async function createListing(client, newListing)
{
    //accesses the sample_airbnb database on mongoDB
    //accesses the "ListingsAndReviews" table,
    //inserts a single document(the new listing) there
    const result = await client.db("sample_airbnb").collection("ListingsAndReviews").insertOne(newListing);

    //these are NOT apostrophes, they are back ticks...(the key to the left of the 1 at the top of the keyboard)
    console.log(`New Listing Created id: ${result.insertedId}`);
}

//this will allow you to insert a whole bunch of data at once from API calls
async function createMultipleListings(client, listingsArray)
{
    const result = await client.db("sample_airbnb").collection("ListingsAndReviews").insertMany(listingsArray);

    console.log(`${result.insertedCount} new listings created with the following ID (s):`)
    console.log(result.insertedIds)
}

