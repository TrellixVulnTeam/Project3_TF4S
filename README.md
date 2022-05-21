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

### 5: Red Tide Dashboard Back End Scripts


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


# 3: Red Tide Dashboard Forum Component

The home component is responsible for the display of all the forum posts on the front end. It is visible from the url: [http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/forum]


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
Returns image to front end

### checkReqFields()
Checks if user has provided text content and a location in order to post
Otherwise displays red text to signify which text fields are required before submission
if false, stops the call to post to forum database

### getDate()
returns a time stamp for the time of posting the new forum post
 
### checkDigits(number : string)
Checks to make sure numbers are displayed correctly on time posted (i.e not 9:3, but 09:03)

### incrementLike( post : any)
called when a forum post's like button is clicked in HTML
increments the likeCount that is displayed and then updates the likeCount of the post

### getCounterID(post : any)
Names likeCounter Paragraph element in HTML a unique identifier
allows us to change each like element independently when a like button is clicked
Param:
post : the forum post's datePosted property is used as part of the unique identifier of the likeCounter text element

### getLikeButtonID(post : any)
Names likeCButton button element in HTML a unique identifier
allows us to change each like button's enabled state  independently when a like button is clicked
Param:
post : the forum post's datePosted property is used as part of the unique identifier of the likeButton button element







