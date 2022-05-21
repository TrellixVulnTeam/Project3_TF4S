import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

//Retrieves Spotify Data from MongoDB for display on the Front End
//API calls are made to App-service.service.ts
//Authors: Robert Kleszczynski, Fehmi Neffati where labelled

@Component({
  selector: 'app-spotify-display',
  templateUrl: './spotify-display.component.html',
  styleUrls: ['./spotify-display.component.scss']
})




export class SpotifyDisplayComponent implements OnInit
{
  podcasts: any = [];

  static get parameters() {
    return [DomSanitizer];
  }







  constructor(private service: AppServiceService, private sanitizer: DomSanitizer) {
  }

  //Sanitizes the URL so that it properly works in the iFrame on the front end
  //Author: Fehmi Neffati
  //Param:
  // url : the url link that you want sanitized for display on the front end
  getSanitizedURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //Called on Start Up
  ngOnInit(): void
  {
    this.callSpotifyApi();
  }

  //Gets all Spotify Podcasts from MongoDB and puts them into an array
  async callSpotifyApi()
  {

    const result = await this.service.getPodcasts()!;



    if (result !== null)
    {
      //gets data fromm API call and stores into podcasts variable
      await result.subscribe(async (response) => {

        console.log("podcasts", response);
        this.podcasts = await Promise.resolve(response);
        console.log(this.podcasts);
        return this.podcasts;



      }, (error) => {
        console.log("error is ", error);
      });

    }
    return;

  }

  //Returns Spotify Data to front end
  getSpotifyData()
  {
    return this.podcasts;
  }

}

