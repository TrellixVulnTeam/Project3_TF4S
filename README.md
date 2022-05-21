# Project 3 : Red Tide Dashboard
## Presented by Team JollyRancher

##Red Tide Radar Demo 
[![Programming By Demonstration](https://img.youtube.com/vi/OZ3x0EFq3Ws/0.jpg)](https://youtu.be/OZ3x0EFq3Ws)

Robert Kleszczysnki, Nisanur Genc, Fehmi Neffati

May 16, 2022

#IMPORTANT: ALL DOCUMENTATION (including resource list and #deployment instructions) are in the documentation folder on this #repo


-------------------------------------------------------------------##Table of Contents
-------------------------------------------------------------------

###1: Red Tide Dashboard Components List

###2: Red Tide Dashboard Home Component

###3: Red Tide Dashboard Forum Component

###4: Red Tide Dashboard Data Platform Components

							Spotify
							Twitter
							Historical Twitter Graphs
							Youtube
							Symptoms

###5: Red Tide Dashboard Back End Scripts


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#1: Red Tide Dashboard Component List:

##Below is a list of all components and scripts being accessed

## Front End:

###Project3/jollyranchers-project3/src/app/home: 
	Responsible for display of the home page, including all the 	information from other sources

###Project3/jollyranchers-project3/app/src/forum:
	Responsible for forum display and retrieval of posts from 	backend.

###Project3/jollyranchers-project3/src/app/graphs: 
	Responsible for retrieval and display of graph data.

###Project3/jollyranchers-project3/src/app/spotify-display: 
	Responsible for retrieval and display of Spotify data.

###Project3/jollyranchers-project3/src/app/symptoms:
	Responsible for retrieval and display of Symptoms data from 	government guideline websites.

###Project3/jollyranchers-project3/src/app/twitter-display: 
	Responsible for retrieval and display of Twitter data.

###Project3/jollyranchers-project3/src/app/youtube-display: 
	Responsible for retrieval and display of youtube data.

######Project3/jollyranchers-project3/src/app/app-service.service.ts

	Responsible for calling backend API and returning data to front end. Every data source component calls this to retrieve or post data to the backend.

-------------------------------------------------------------------#2: Red Tide Dashboard Home Component

The home component is responsible for the display of all the information form various sources on the front end.






 




