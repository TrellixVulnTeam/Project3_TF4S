import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../app-service.service";

@Component({
  selector: 'app-spotify-display',
  templateUrl: './spotify-display.component.html',
  styleUrls: ['./spotify-display.component.scss']
})
export class SpotifyDisplayComponent implements OnInit
{

  private podcasts: any = [];

  constructor(private service: AppServiceService) { }

  ngOnInit(): void
  {
    this.callTwitterApi();
  }

  async callTwitterApi()
  {
    const result = await this.service.getPodcasts()!;
    if (result != null)
    {
      //checks which database you chose and stores the data accordingly
      await result.subscribe(async (response) => {

        console.log("podcasts", response);
        this.podcasts = response;
        console.log(this.podcasts);
        return this.podcasts;



      }, (error) => {
        console.log("error is ", error);
      });
    }
    return;

  }

  getSpotifyData()
  {

    return this.podcasts;

  }

}
