//this is written in index.html



//TODO: check to see if data is flowing from getYoutubeData in index.html when onchange even is called and see if it goes here
 export update(collection) {
  var select = document.getElementById('videos');
  var option = select.options[select.selectedIndex].value;
  var source;

  document.getElementById('displayTest').title = "Working";


  if(option == "fox13")
  {
    console.log("working");
    var collection = new YoutubeDisplayComponent().getYoutubeData("fox13");

    source = "https://www.youtube.com/watch?v=TMVteA-FzFA";
  }
  else if(option == "10Tampa")
  {
    source = "https://www.youtube.com/embed/tgbNymZ7vqY"
  }
  else if(option == "abc")
  {
    source = "https://www.youtube.com/watch?v=SCnK--ebTxE&list=OLAK5uy_kQm6ddTOsg6k62g5E6IFKECRWPAZD0e-4&index=2";
  }
  else if(option == "wfla8")
  {
    var collection = getCollection("wfla8");

    source = "https://www.youtube.com/watch?v=TMVteA-FzFA";
  }
  else if(option == "general")
  {
    source = "https://www.youtube.com/watch?v=NBqx2cHmuGk&list=OLAK5uy_m9EiltakhrlR8igBu-t-eHclppe2zpOfU&index=6";
  }
  var collection = new YoutubeDisplayComponent().getYoutubeData("fox13");
  document.getElementById('vidPlayer').src = source;
}

function getCollection(collection)
{


  const uri = "mongodb+srv://jollyranchers2022:project3@jollyranchers.yp9ee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

  try
  {
      await client.connect();
      const cursor = await client.db("youtubeData").collection(collection).find();
      const result = await cursor.toArray();
      console.log(result.snippet.title);
  }
  catch (e)
  {
    console.error(e);
  } finally
  {
    await client.close();
  }

}



update();
