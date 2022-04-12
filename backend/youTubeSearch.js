require('dotenv').config();
//make sure the .env file is in the same directory when running this
const{google}= require('googleapis');

 google.youtube('v3').search.list({
    key: process.env.YOUTUBE_TOKEN,
    part: "snippet",
    q: "Red Tide",
     maxResults: 5
}).then((response) => {
    const {data} = response; //get just the search results part, no headers or request data
    //items holds all the video search data
    data.items.forEach((item) => {
        console.log(item);
    })
 }).catch((err) => console.log(err));