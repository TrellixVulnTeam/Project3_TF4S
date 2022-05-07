import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";
<<<<<<< Updated upstream
import {DomSanitizer, SafeResourceUrl , SafeUrl} from "@angular/platform-browser";
=======
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

>>>>>>> Stashed changes

@Component({
  selector: 'app-spotify-display',
  templateUrl: './spotify-display.component.html',
  styleUrls: ['./spotify-display.component.scss']
})
<<<<<<< Updated upstream
=======
export class SpotifyDisplayComponent implements OnInit
{
  static get parameters() {
    return [DomSanitizer];
  }
>>>>>>> Stashed changes


<<<<<<< Updated upstream
export class SpotifyDisplayComponent implements OnInit
{
  podcasts: any = [];
  constructor(private service: AppServiceService, private sanitizer: DomSanitizer) {
  }
  getSanitizedURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
=======

  constructor(private service: AppServiceService, private sanitizer: DomSanitizer)
  {
    this.sanitizer = sanitizer;

>>>>>>> Stashed changes
  }

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
    let cleanLinks: any = [];
    const length = this.podcasts.length
    for(let i = 0; i < length; i++)
    {
      cleanLinks.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.podcasts[i].url));
    }
    return cleanLinks;
  }

}

