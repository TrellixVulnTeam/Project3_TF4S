const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = {
    getDatabaseInfo: async function (collectionName) {

        try {

            await client.connect();
            const cursor = await client.db("jollyranchers").collection(collectionName).find({});

            const result = await cursor.toArray();
            console.log(result);
            if (result)
            {
                result.forEach((r, i) => {

                    //  console.log();
                    console.log(`_id: ${r._id}`);
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
    }
}