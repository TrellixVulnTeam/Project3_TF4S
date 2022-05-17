import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../app-service.service";
//Calls website API to retrieve Twitter data from MongoDB to display it on the front end
//API calls are made to App-service.service.ts
// Author: Robert Kleszczysnki

@Component({
  selector: 'app-twitter-display',
  templateUrl: './twitter-display.component.html',
  styleUrls: ['./twitter-display.component.scss']
})
export class TwitterDisplayComponent implements OnInit
{
  private tweets: any = [];

  constructor(private service: AppServiceService) { }

  //Runs on startup to get Twitter data
  ngOnInit(): void
  {
    this.callTwitterApi();
  }

  //Calls website API to retrieve Twitter Data from MongoDB and stores it in an array
  async callTwitterApi()
  {
      const result = await this.service.getTweets()!;
    if (result !== null)
    {
      //stores Twitter data into tweets variable
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

  //Returns Twitter data to front end
  getTwitterData()
  {

    return this.tweets;

  }

}
