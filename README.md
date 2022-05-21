# Project 3 : Red Tide Dashboard
## Presented by Team JollyRancher

## Red Tide Radar Demo 


[![Programming By Demonstration](https://img.youtube.com/vi/OZ3x0EFq3Ws/0.jpg)](https://youtu.be/OZ3x0EFq3Ws)

Robert Kleszczysnki, Nisanur Genc, Fehi Neffati

May 16, 2022

# IMPORTANT: ALL DOCUMENTATION (including resource list and deployment instructions) is located in the documentation folder on this repo.


-------------------------------------------------------------------
## Table of Contents
-------------------------------------------------------------------

### 1: Red Tide Dashboard Components List

### 2: Red Tide Dashboard Home Component

### 3: Red Tide Dashboard Forum Component

### 4: Red Tide Dashboard Data Platform Components

							Spotify
							Twitter
							Historical Twitter Graphs
							Youtube
							Symptoms

### 5: Red Tide Dashboard App-Service Service Script

### 6: Red Tide Dashboard Back End Files


---------------------------------------------------------------------
---------------------------------------------------------------------
---------------------------------------------------------------------

# 1: Red Tide Dashboard Component List:

## Below is a list of all components and scripts being accessed

## Front End:

### Project3/jollyranchers-project3/src/app/home: 
	Responsible for display of the home page, including all the 	information from other sources

### Project3/jollyranchers-project3/app/src/forum:
	Responsible for forum display and retrieval of posts from 	backend.

### Project3/jollyranchers-project3/src/app/graphs: 
	Responsible for retrieval and display of graph data.

### Project3/jollyranchers-project3/src/app/spotify-display: 
	Responsible for retrieval and display of Spotify data.

### Project3/jollyranchers-project3/src/app/symptoms:
	Responsible for retrieval and display of Symptoms data from government guideline websites.

### Project3/jollyranchers-project3/src/app/twitter-display: 
	Responsible for retrieval and display of Twitter data.

### Project3/jollyranchers-project3/src/app/youtube-display: 
	Responsible for retrieval and display of youtube data.

### Project3/jollyranchers-project3/src/app/app-service.service.ts

	Responsible for calling backend API and returning data to front end. Every data source component calls this to retrieve or post data to the backend.

-------------------------------------------------------------------

# 2: Red Tide Dashboard Home Component

The home component is responsible for the display of all the information form various sources on the front end. It is visible from the url: http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/

## Home.component.ts:

Responsible for managing Posting to the Forum and Retrieving Posts from the Forum
API calls are made to App-service.service.ts
Uses checkIfTestingLocally() from home.component.ts as stated above in imports
Author: Robert Kleszczynski

### ngOnInIt
On initialization, adds an even listener to the submit button so form submission is possible

### getDataFromAPI(platform: string) 
Retrieves relevant data from the database with a specified media platform
__Param:__
platform: which source we wish to retrieve data from (i.e. Spotify, Youtube, Twitter)

### getGraphsData()
Returns graph data from database

### getTwitterData()
Returns Twitter data from database

### getSpotifyData()
Returns Spotify data from database

### getLastUpdated()
Gets the last updated data

### checkIfTestingLocally()
CHANGE THIS WHEN CHANGING ROUTING CONFIGURATION
Returns a boolean responsible for checking if the build is testing on localHost or on AWS server
returns true if using localHost and testing locally
returns false if testing on AWS
called in forum.component.ts and app-service.service.ts for correct routing based on choice

-------------------------------------------------------------------------------------------------

# 3: Red Tide Dashboard Forum Component

The forum component is responsible for the display of all the forum posts on the front end. You can access it by clicking on the _Forum_ link on the top right corner of the home page.


## Forum.component.ts:
Responsible for managing Posting to the Forum and Retrieving Posts from the Forum
API calls are made to App-service.service.ts
Uses checkIfTestingLocally() from home.component.ts as stated above in imports
Author: Robert Kleszczynski

### ngOnInit()
On initialization, adds an even listener to the submit button so form submission is possible
  
### CallForumPostApi()
Retrieves Forum Posts from MongoDB

### submitForm()
Sends form Data to be uploaded to the forumPosts database
Called when submit button is clicked.

### getForumPosts()
Returns forum posts to front end

### getImage(post : any)
 Returns image to front end if there is any connected to the post
 __Param:__
 _post:_ the forum post that you wish to obtain an image for

### checkReqFields()
Checks if user has provided text content and a location in order to post
Otherwise displays red text to signify which text fields are required before submission
if false, stops the call to post to forum database

### getDate()
Returns a time stamp for the time of posting the new forum post
 
### checkDigits(number : string)
  Checks to make sure numbers are displayed correctly on time posted (i.e not 9:3, but 09:03)
  __Param:__ 
  _number:_ the substring from date that we wish to check the formatting of (i.e. hours could be "9" and we fix it to "09")

### incrementLike( post : any)
 Called when a forum post's like button is clicked in HTML
 Increments the likeCount that is displayed and then updates the likeCount of the post
  __Param:__
  _post :_ the target post that we wish to update the likeCount on

### getCounterID(post : any)
Names likeCounter Paragraph element in HTML a unique identifier
allows us to change each like element independently when a like button is clicked
__Param:__
_post :_ the forum post's datePosted property is used as part of the unique identifier of the likeCounter text element

### getLikeButtonID(post : any)
Names likeButton button element in HTML a unique identifier
allows us to change each like button's enabled state  independently when a like button is clicked
__Param:__
_post :_ the forum post's datePosted property is used as part of the unique identifier of the likeButton button element

-----------------------------------------------------------------------------------------------------------------------

# 4: Red Tide Dashboard Data Platform Components:
Each of these platform componentes retrieves data from the back end and displays it on the front end.
-----------------------------------------------------------
# Spotify-display Component
Retrieves Spotify podasts from the backend and displays them on the front end.

## Spotify-display.component.ts:

//Retrieves Spotify Data from MongoDB for display on the Front End
//API calls are made to App-service.service.ts
//Authors: Robert Kleszczynski, Fehmi Neffati where labelled

### getSanitizedURL(url: string)
  Sanitizes the URL so that it properly works in the iFrame on the front end
  Author: Fehmi Neffati
  __Param:__
  _url :_ the url link that you want sanitized for display on the front end

### ngOnInit()
Called on Start Up

### callSpotifyApi()
Gets all Spotify Podcasts from MongoDB and puts them into an array

### getSpotifyData()
Returns Spotify Data to front end
----------------------------------------------------------
# Twitter-display Component

## Twitter-display.component.ts:
Calls website API to retrieve Twitter data from MongoDB to display it on the front end
API calls are made to App-service.service.ts
Author: Robert Kleszczysnki

### ngOnInit()
Runs on startup to get Twitter data

### callTwitterApi()
Calls website API to retrieve Twitter Data from MongoDB and stores it in an array

### getTwitterData()
Returns Twitter data to front end
------------------------------------------------------------------------------------
# Graphs.component

## Graphs.component.ts
//Retrieves historical twitter data graphs from the backend for display on the front end.
//Author: Fehmi Neffati

### ngOnInit()
Runs graph data to front end

### getSanitizedURL(url: string)

### callGraphApi()

### getGraphsData()
--------------------------------------------------------------------------------------
# Youtube-diplay.component

## Youtube-diplay.component.ts

Calls website API to retrieve Youtube data from MongoDB to display it on the front end
API calls are made to App-service.service.ts
Author: Robert Kleszczysnki

### ngOnInit()
Runs on startup - adds a listener to check for changes in value in the drop down menu

### callYoutubeAPI(channel: string)
Calls website API to retrieve Youtube data from MongoDB based on which channel is provided
__Param:__
_Channel:_ which Youtube channel source in the database you want data from

### getYoutubeData()
Checks the drop down menu for the selected value and relays it to the website API call to return the desired data

### buildPlaylist( collection : any )
Uses an array of Youtube video data to build a Youtube playlist from the video id codes
Returns a URL that works as a playlist in for an iFrame
__Param:__
_collection:_ the array of Youtube videos that you wish to create a playlist with
Source: https://www.w3schools.com/html/html_youtube.asp
----------------------------------------------------------------------------------------
# Symptoms-display Component

## Symptoms-display.component.ts
//Calls website API to retrieve Symptoms data from MongoDB to display it on the front end
//API calls are made to App-service.service.ts
//Author: Robert Kleszczysnki

### ngOnInit()
Runs on startup to get symptoms data

### callSymptomApi()
Calls website API to retrieve Symptoms Data from MongoDB and stores it in an array

### getSymptomData()
Returns symptoms data to front end
-------------------------------------------------------------
--------------------------------------------------------------
-------------------------------------------------------------
# 5 App-service.service.ts
//Contains all website API for front end that routes to the correct call to the backend
//All requests are made from their respective component typescript files (i.e. twitter-display.component.ts)
//All backend calls are made to databaseAPI.js in the backend folder
//Uses checkIfTestingLocally() from home.component.ts as stated above in imports
//Authors: Robert Kleszczynski, Fehmi Neffati where labelled

//How to create request routes:
//https://malcoded.com/posts/angular-backend-express/


 ### async connect()
 Connects to the backend (returns "Hello World" as a test)
 
  ### async getData(platform:string)
  Relays data from MongoDB on the backend to the front end based on which media platform is desired
  __Param:__
  _platform:_ the data source you wish to retrieve data for

  ### async getYoutubeVideos(category : string)
  Returns Youtube videos based on specified channel source
  __Param:__
  _category:_ the name of the youtube channel you wish to retrieve video data from. (i.e. 'fox13' for fox news videos on red tide)

  ### async getTweets()
 Returns Twitter tweet data from MongoDb
 

  ### async getPodcasts()
  Returns Podcast data from MongoDb
   
  ### async getForumPosts()
  Returns forum posts from MongoDb
  
  ### async updatePostLikeCount(postID :string, likeCount : string)
   Updates a target forum post's like count after the like button is clicked
  __Param:__
  _postID:_ the _id property of the post that is a unique identifier
  _likeCount:_ the new update value we wish to update the post's likeCount with, (should just be one more than previous value)
  ------------------------------------------------------------------------
  -----------------------------------------------------------------------
  -------------------------------------------------------------------------
  # 6: Red Tide Dashboard Back End Files
  ## Butler.py
The butler is the class that would serve as the middle man between all of the individual scripts and the data base.
The butler will call every script we have and then serve all of the data it gathers to their respective collections in the data base
subsequently updating all of our information in the website.

Author: Fehmi Neffati

  
  ## CountyExtractor.py
  Author: Fehmi Neffati

## databaseAPI.js
Database API manages all the routing for the backend as well as backend method calls to mongo
In order to post forum posts to the Database, it uses a gridfs-stream as well as file submission through the use of multer
All requests are called from App-service.service.ts
All requests are relayed to mongoAccess.js for database operations
Author: Robert Kleszczynski unless labelled otherwise

Below are all the backend API routes for all requests you can make to the back end.

### app.route('/')
@route GET
@desc sends back basic hello message on main page for testing connection

### app.route('/api/twitter')
@route GET
@desc Retrieves Twitter tweet data from MongoDB

### app.route('/api/Graphs')
@route GET
@desc Retrieves Graph data from MongoDB
Author: Fehmi Neffati

### app.route('/api/lastUpdate')
@route GET
@desc: Retrieves the date that the database was last updated
Author: Fehmi Neffati

### app.route('/api/symptoms')
@route GET
@desc Retrieves Symptom data from MongoDB. I.e. health guidelines, symptoms, etc.

### app.route('/api/youtube/fox13')
@route GET
@desc Retrieves Youtube video data of the fox13 Youtube channel from MongoDB, including URL links

### app.route('/api/youtube/tampa10')
@route GET
@desc Retrieves Youtube data from channel Tampa10  from MongoDB

### app.route('/api/youtube/abcAction')
@route GET
@desc Retrieves Youtube data from channel abcAction from MongoDB

### app.route('/api/youtube/wfla8')
@route GET
@desc Retrieves Youtube data from wfla8 from MongoDB
might be unused, there wasn't much on Youtube from this channel

### app.route('/api/youtube/general')
@route GET
@desc Retrieves Youtube data from more generic source (i.e "What is Red Tide?" kinds of videos as well as videos
from misc users from MongoDB

### app.post('/api/forum/submitImg', upload.single('file')
@post Stores forum Posts with Image submission
@desc uploads forum post to database and uses Multer to store the image separately
__Param:__ 
_upload.single('file') :_ takes the fule submitted through front end and uploads to database

### app.post('/api/forum/submit', upload.none()
@post Stores forum posts without Image submission (i.e. text only submissions)
@desc Stores text only posts to MongoDB "forumPosts" database.
__Param:__
_ upload.none() :_ means we are only updating the text-based form data from the front end and are not adding any pictures

### app.route('/api/forum/posts')
@route GET
@desc Retrieves all Forum posts (the text based parts) from MongoDB

### app.route('/api/forum/posts/images/:filename')
@route GET
@desc Retrieves Forum images from MongoDB. This is called separately from retrieving forum posts
as not all forum posts have associated images
https://stackoverflow.com/questions/34921171/display-images-from-gridfs-mongodb
__Param:__
 _filename :_ the unique identifier stored in the forum post that will identify which picture is tied to that target forum post
 
### app.route('/api/forum/posts/likes/:postId/:likeCount')
 @route GET
updates likeCount of respective forum Post(found by  _id property) with new amount
__Param:__
_postId:_ the unqiue _id property of the post to be used as the ientifier of the post
_likeCount:_ the new value of the like count that we wish toe update the database with

### app.route('/api/spotify')
@route GET
@desc Retrieves Spotify data from MongoDB

### app.route('/api/sensorData')
UNUSED
@route GET
@desc Retrieves Sensor data from MongoDB

### function getDate()
Returns a URL friendly timestamp with which we name image files and store a reference in the forum posts
Is used as a unique identifier for each image posted based on the date and time it was posted
-------------------------------------------------------------------------
## GraphingHistoricalData.py
In this file we will be plotting a graph of data about Tweets in different Florida Cities.
The Data Set source: https://github.com/tbep-tech/red-tide-twitter/blob/master/Secure_Tweets_Data.csv
Special thanks to Dr. Tania Roy for recommending the data set from Prof. Skripnikov's research.

The graph here will be a representation of how many times was a red tide mentioned in any of florida's 400+ cities
We do that by extracting a list of cities and comparing them to the locations of the tweets provided in the data set

Author: Fehmi Neffati

----------------------------------------------------------------------
## mongoAccess.js
These methods are called from the API to access and make requests of the database, including:
 finding collections and writing forum posts
All calls are made from databaseAPI.js
Author: Robert Kleszczynski

### getDatabaseInfo: async function ( databaseName, collectionName)
Called anytime we wish to get collection data from MongoDB
__Params:__
_databaseName:_ the name of the database you wish to access
_collectionName:_ the name of the collection in the database you wish to access

### writeTextForumPost: async function (databaseName, collectionName, entry)
Creates a text-only forum post in the "forumPosts" collection of the database.
Called when user clicks to submit a Forum Post. THis is called when an image is not submitted.
__Param:__
     _databaseName:_ name of database to create a new listing
    _collectionName:_ name of collection in the selected database to create a new listing
    _entry :_ the content we will use to create a new element in the collection
    
   
### writeImgForumPost: async function (databaseName, collectionName, entry, postNumber)
   Creates a forum post with image in the "forumPosts" collection of the database.
   Called when user clicks to submit a Forum Post. THis is called when an image is submitted.
   __Param:__
    _databaseName:_ name of database to create a new listing
    _collectionName:_ name of collection in the selected database to create a new listing
    _entry :_ the content we will use to create a new element in the collection
    _postNumber:_ used as a unique identifier to ID which images belong to which posts
    
   ### async updateLikeCount(postID, likeCount)
   Updates target post's likeCount property with new value of likeCount
   __Param:__
    _postId:_ the unique identifier of our target post that we use to identify it in the database
    _likeCount:_ the new amount that we wish to set the likeCount property with
    
------------------------------------------------------------------------------------
## PodcastExtractor.py
This code will deal with extracting, filtering, and storing the list of podcasts that relate to the Topic at hand.
Disclaimer: There will be some false positives that get through the filtering.
Author: Fehmi Neffati

--------------------------------------------------------------------------------
## pythonCaller.js
UNUSED: TESTING OF RUNNING PYTHON SCRIPTS IN JAVASCRIPT

IMPORTANT:
All print statements with string values MUST be encoded to utf-8 to successfully be run in Node.js

Any print statements of dictionary elements MUST be commented out  before deploying to server
These print statements will cause errors otherwise
-----------------------------------------------------------------------------
## scheduler.js
//Used to run a scheduled task daily.
//Author: Robert Kleszczynski, Fehmi Neffati
//IMPORTANT: need to install some packages in terminal:
 npm i node-cron shelljs
before running this file

### cron.schedule('0 0 * * * *', function(){...})
This code runs daily at midnight
Scheduler code by Robert Kleszczynski
---------------------------------------------------
## SymptomsAndGuidelines.py
This is yet another web scraper that goes to websites such as: EPA, Florida Health, cdc and extracts Symptoms caused by red tide
and also gives a list of guidelines
@author: Fehmi Neffati
-----------------------------------------------------------------------
## twitter_requests.py

This file calls the API and pulls the tweets for Red Tide Webpage.

############################
IMPORTANT:
All print statements with string values MUST be encoded to utf-8 to successfully be run in Node.js

Any print statements of dictionary elements MUST be commented out  before deploying to server
These print statements will cause errors otherwise
############################
Execution:		>> python3 twitter_requests.py
@author Nisanur Genc
@date 04/07/22
-------------------------------------------------------
## youtubeToDB.js
Calls Youtube API to search for the top 50 results in regards to Red Tide
Cleans results and sorts them by channel to 4 news channels in Florida and a General Red Tide Channel for Red Tide explanations
Sorts results further by putting the most recent results first
Clears database collections and updates with the  latest results
called in scheduler.js to run daily
Author: Robert Kleszczynski

### async function createListings(client, collection, newListings)
Creates a new listings in provided collection using an array of lisings to be added
__Param:__
_client:_ the MongoDB connection we wish to use
_collection:_ the nam eof the collection in the MongoDB connection we wish to insert new entries into
_newListings:_ an array o fnew listings that we wish to add


### async function clearListings(client, collection)
Deletes all entries in a selected collection
__Param:__
_client:_ the mongoDB connection we wish to use to make this request
_collection:_ the collection in the MongoDB that we wish to clear of entries


### async function listDatabases(client)
Lists all Databases in a specified connection.
Used for debugging
__Param:__
_client :_ the mongoB connection we wish to check the contents of
---------------------------------------------------------




