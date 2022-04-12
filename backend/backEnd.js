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

        });*/

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

        await findOneListingByName(client, "My Crappy Dorm");

        //IMPORTANT: if the document listing is missing a search value, like bathrooms, it is NOT included in the results
        //after checking, if it lacks a field when you try to access it, it will display invalid value
       /* await findListingsWithMinimumCriteria(client, {
            minimumBedrooms: 0,
            minimumBathrooms: 0,
            maxNumberResults: 20
        });*/

        //You can even add new fields to a listing. This originally didn't have bedrooms, or beds.
        //await updateListingByName(client, "My Crappy Dorm", {bedrooms: 6, beds: 8});
        //await findOneListingByName(client, "My Crappy Dorm"); //shows we changed values

       //updates listing if found, otherwise makes a new listing with properties in the database
       // await upsertListingByName(client, "Cozy Cottage",{name : "Cozy Cottage", bedrooms: 3, bathrooms: 2});

        //adds field "Property Type" to all listings in database if they don't have it already
       // await updateAllListingsToHavePropertyType(client);

        //await deleteListingByName(client, "Cozy Cottage");
        //await deleteListingsScrapedBeforeDate(client, new Date("2019-02-15"));

        await findTenCheapestSuburbs(client, "Australia", "Sydney", 10);
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

//Updating a listing means editting properties in  a listing in a table
//this function will search for a listing with the specified name
//any properties that we put in the updatedListing, will be changed,
//this includes adding new fields if they weren't there before
//anything we don't put in the updatedListing will NOT be changed
async function updateListingByName(client, listingName, updatedListing)
{
    //first parameter is the search filter we use to find the listing
    //in this case, we search for a listing where the name is listingName

   const result = await client.db("sample_airbnb").collection("ListingsAndReviews").updateOne({name : listingName}, {$set: updatedListing});
    //{$set: x } means we are swapping out the old listing for X

    console.log(`${result.matchedCount} documents found with provided criteria`);
    console.log(`${result.modifiedCount} documents were updated`);
}

//upsert will update a listing if one is found OR it will create a new listing with the provided properties
async function upsertListingByName(client, listingName, upsertedListing)
{
    //by adding the additional parameter at the end, updateOne allows for inserting new listings if they don't exist
    const result = await client.db("sample_airbnb").collection("ListingsAndReviews").updateOne({name: listingName}, {$set: upsertedListing},{upsert: true});

    console.log(`${result.matchedCount} documents found with provided criteria`);
    if(result.upsertedCount > 0)
    {
        console.log(`1 document was upserted: ${result.upsertedId}`);
        
    }
    else
    {
         console.log(`${result.modifiedCount} documents were updated`);
    }
}

async function updateAllListingsToHavePropertyType(client)
{
    //first parameter says to check if the field "propertyType" does not exist in each listing
    //if it does not exist, use $set to add a new field "propertyType"
    const result = await client.db("sample_airbnb").collection("ListingsAndReviews").updateMany(
        {propertyType: {$exists: false}}, {$set: {propertyType: "Unknown"}});

    console.log(`${result.matchedCount} documents found with provided criteria`);
    console.log(`${result.modifiedCount} documents were updated`);

}

async function deleteListingByName(client, listingName)
{
    const result = await client.db("sample_airbnb").collection("ListingsAndReviews").deleteOne({name: listingName});
    console.log(`${result.deletedCount} documents were deleted`);
}

async function deleteListingsScrapedBeforeDate(client,date)
{
    //$lt means less than comparator
    //in this case it finds all listings with date less than specified date
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteMany({"last_scraped": {$lt: date}});
    console.log(`${result.deletedCount} documents were deleted`);
}

async function findTenCheapestSuburbs(client, country, market, maxResults )
{
    //you can export the code to Node from Atlas and copy paste it here
    const pipeline = [
        {
            '$match': {
                'bedrooms': 1,
                'address.country': country,  //We make this more flexible by putting country parameter here
                'address.market': market,  //we make this more flexibly by putting market parameter here
                'address.suburb': {
                    '$exists': 1,
                    '$ne': ''
                },
                'room_type': 'Entire home/apt'
            }
        }, {
            '$group': {
                '_id': '$address.suburb',
                'averagePrice': {
                    '$avg': '$price'
                }
            }
        }, {
            '$sort': {
                'averagePrice': 1
            }
        }, {
            '$limit': maxResults    //we make the code more flexibly by putting maxResults parameter here
        }
    ];

    //we pass the pipeline to the collection we want to agregate data on
    //we store the results into aggCursor
    const aggCursor = client.db("sample_airbnb").collection("listingsAndReviews").aggregate(pipeline);

    await  aggCursor.forEach(airbnbListing => {
        console.log(`${airbnbListing._id} : ${airbnbListing.averagePrice}`);
    });

}