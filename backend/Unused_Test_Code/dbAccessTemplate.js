const { MongoClient, ServerApiVersion } = require('mongodb');

async function main()
{
    const uri = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try{
        await client.connect();

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