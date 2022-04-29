import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

  private twitterData: any = [];
  private symptomsData: any = [];
  private youtubeData: any = [];
  spotifyData: any = [];
  private sensorData: any = [];

  constructor(private service: AppServiceService) {
  }

  ngOnInit(): void {
    this.getDataFromAPI("twitter")
    this.getDataFromAPI("spotify")
  }

  async getDataFromAPI(platform: string) {
    const result = await this.service.getData(platform);

    if (result != null) {
      //checks which database you chose and stores the data accordingly
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
      } else if (platform == "youtube") {
        result.subscribe((response) => {
          console.log("response", response);
          this.youtubeData = response;
        }, (error) => {
          console.log("error is ", error);
        });
      } else if (platform == "spotify") {
        result.subscribe((response) => {
          console.log("response", response);
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

  getTwitterData() {
    return this.twitterData;
  }

  getSpotifyData(){
    return this.spotifyData;
  }

}
