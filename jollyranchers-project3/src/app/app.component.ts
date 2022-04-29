import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

<<<<<<< Updated upstream
export class AppComponent {
  title = 'jollyranchers-project3';
  path = '';

  constructor(private pathChange: Router) {
    pathChange.events.subscribe((event)=>{
      if (event instanceof NavigationEnd){
        if (event.url == '/forum'){
          this.path = event.url.split('/')[1];
          console.log(event.url);
        }
        else{
          this.path = '';
        }
=======
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
      } else if (platform == "podcasts") {
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
>>>>>>> Stashed changes
      }
    })
  }
}
