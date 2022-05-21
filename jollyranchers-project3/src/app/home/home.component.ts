import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";

@Component({ templateUrl: 'home.component.html' })

//Responsible for retrieve requests to API for each media platform that data is gathered on
//API calls are made to App-service.service.ts

//IMPORTANT: At the bottom of this file there is a method called checkIfTestingLocally()
//Make sure this returns true if running on localHOst
//Make sure this returns false if running on AWS
//Authors: Robert Kleszczynski (unless labelled otherwise)


export class HomeComponent implements OnInit {

  private twitterData: any = [];
  private symptomsData: any = [];
  private graphsData: any = [];
  private youtubeData: any = [];
  spotifyData: any = [];
  private sensorData: any = [];
  private lastUpdated: any = [];

  constructor(private service: AppServiceService) {
  }

  ngOnInit(): void
  {
    this.getDataFromAPI('lastUpdate');
  }

  //Retrieves relevant data from the database with a specified media platform
  //Param:
  //platform: which source we wish to retrieve data from (i.e. Spotify, Youtube, Twitter)
  async getDataFromAPI(platform: string) {
    const result = await this.service.getData(platform);

    if (result != null) {
      //checks which database you chose and retrieves the data accordingly
      if (platform == "twitter") {
        result.subscribe((response) => {
          console.log("response", response);
          this.twitterData = response; //IMPORTANT: If you need a specific property, this would be response["features"]
        }, (error) => {
          console.log("error is ", error);
        });
      } else if (platform == "symptoms") {
        result.subscribe((response) => {
          console.log("response", response);
          this.symptomsData = response;
        }, (error) => {
          console.log("error is ", error);
        });
      }
      //Case Added by: Fehmi Neffati
      else if (platform == "Graphs") {
        result.subscribe((response) => {
          console.log("response", response);
          this.graphsData = response;
        }, (error) => {
          console.log("error is ", error);
        });
      }
      else if (platform == "lastUpdate") {
        result.subscribe((response) => {
          console.log("response", response);
          this.lastUpdated = response;
        }, (error) => {
          console.log("error is ", error);
        });
      }
       else if (platform == "spotify") {
        result.subscribe((response) => {
          console.log("spotify", response);
          this.spotifyData = response;
        }, (error) => {
          console.log("error is ", error);
        });
      } else if (platform == "sensorData") {
        result.subscribe((response) => {
          console.log("response", response);
          this.symptomsData = response;
        }, (error) => {
          console.log("error is ", error);
        });
      } else {
        console.log("Error: invalid database request");
      }

    }

  }

  //Returns graph data from database
  //Author: Fehmi Neffati
  getGraphsData(){
    return this.graphsData;
  }

  //Returns Twitter data from database
  getTwitterData() {
    return this.twitterData;
  }

  //Returns Spotify data from database
  getSpotifyData(){
    return this.spotifyData;
  }

  getLastUpdated()
  {
    return this.lastUpdated;
  }

}

//CHANGE THIS WHEN CHANGING ROUTING CONFIGURATION
//Returns a boolean responsible for checking if the build is testing on localHost or on AWS server
//returns true if using localHost and testing locally
//returns false if testing on AWS
//called in forum.component.ts and app-service.service.ts for correct routing based on choice

export function checkIfTestingLocally()
{
  let isTestingLocally = true;
  return isTestingLocally;
}
