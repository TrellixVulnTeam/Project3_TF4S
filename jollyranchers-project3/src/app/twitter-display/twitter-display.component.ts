import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../app-service.service";

@Component({
  selector: 'app-twitter-display',
  templateUrl: './twitter-display.component.html',
  styleUrls: ['./twitter-display.component.scss']
})
export class TwitterDisplayComponent implements OnInit
{
  private tweets: any = [];

  constructor(private service: AppServiceService) { }

  ngOnInit(): void
  {
    this.callTwitterApi();
  }

  async callTwitterApi()
  {
      const result = await this.service.getTweets()!;
    if (result !== null)
    {
      //checks which database you chose and stores the data accordingly
      await result.subscribe(async (response) => {

          console.log("tweets", response);
          this.tweets = response;
          console.log(this.tweets);
          return this.tweets;



      }, (error) => {
        console.log("error is ", error);
      });
    }
    return;

  }

  getTwitterData()
  {

    return this.tweets;

  }

}
