import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';



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

  getSanitizedURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnInit(): void
  {
    this.callSpotifyApi();
  }

  async callSpotifyApi()
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

