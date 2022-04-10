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
        /*await createMultipleListings(client, [{
            name: "loveley beach house",
            summary: "its on the beach",
            bedrooms: 3
        },
            {
                name: "Corn Shack",
                summary: "A house on a corn field",
                bedrooms: 1
            },
            {
                name: "My Crappy Dorm",
                summary: "This place is tiny",
                bedrooms: 2
            }]);*/

        //await findOneListingByName(client, "My Crappy Dorm")

        //if the document is missing a value, like bathrooms, it is not included in the results
        //after checking, if it lacks a field when you try to access it, it will display invalid value
        await findListingsWithMinimumCriteria(client, {
            minimumBedrooms: 0,
            minimumBathrooms: 0,
            maxNumberResults: 20
        })
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

//returns only one document, even if there are multiple same documents in collection
async function findOneListingByName(client, nameOfListing)
{
    const result = await client.db("sample_airbnb").collection("ListingsAndReviews").findOne({name: nameOfListing});

    if(result)
    {
        console.log(`Found a listing in the collection with a name: '${nameOfListing}'`);
        console.log(result);
    }
    else
    {
        console.log(`No listings found with name '${nameOfListing}'`);
    }
}

//find results in a database with at leas the minimum bedrooms, bathrooms, and a maximum number of results
//check documentation for other comparison query operators
async function findListingsWithMinimumCriteria(client, {minimumBedrooms = 0,
                                                        minimumBathrooms = 0,
                                                        maxNumberResults = Number.MAX_SAFE_INTEGER } = {})
{
    //can iterate over cursor to get results one by one (check documentation)
    const cursor = await client.db("sample_airbnb").collection("ListingsAndReviews").find({
        bedrooms: {$gte: minimumBedrooms},
        bathrooms: {$gte: minimumBathrooms},
    }).sort({last_review : -1}).limit(maxNumberResults);
    //sort by last review in descending order (most recent first)
    //limits results to maxNumberResults

    //returns all results as an array
    const results = await  cursor.toArray();

    //prints a summary of each listing
    if(results.length >  0)
    {
       console.log(`Found listing(s) with at least ${minimumBedrooms} bedrooms and ${minimumBathrooms} bathrooms: `);
       results.forEach((result, i) => {
           let date = new Date(result.last_review).toDateString();
           console.log();
           console.log(`${i+1}. name: ${result.name}`);
           console.log(`_id: ${result._id}`);
           console.log(`Bedrooms: ${result.bedrooms}`);
           console.log(`Bathrooms: ${result.bathrooms}`);
           console.log(`Most Recent Review Date: ${new Date(result.last_review).toDateString()}`)

    })
    }
    else
    {
        console.log(`No results found`);
    }
}