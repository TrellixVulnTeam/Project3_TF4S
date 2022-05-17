import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../app-service.service";

//Calls website API to retrieve Youtube data from MongoDB to display it on the front end
//API calls are made to App-service.service.ts
//Author: Robert Kleszczysnki


@Component({
  selector: 'app-youtube-display',
  templateUrl: './youtube-display.component.html',
  styleUrls: ['./youtube-display.component.scss']
})
export class YoutubeDisplayComponent implements OnInit
{
  //Variablbes for storing content for each channel
  //wfla8 and tampa10 are not displayed currently as these channels don't have enough Red Tide
  // // content to justify using them at this time
  private fox13: any = [];
  private tampa10: any = [];
  private abcAction: any = [];
  private wfla8: any = [];
  private general: any = [];

  //variables for storing prebuilt playlists for each channel
  private foxPlaylist : any = [];
  private tampaPlaylist: any = [];
  private abcPlaylist : any = [];
  private wflaPlaylist : any = [];
  private generalPlayList : any = [];



  constructor(private service: AppServiceService) { }

  //Runs on startup - adds a listener to check for changes in value in the drop down mennu
  ngOnInit(): void
  {

    const single = this;
    const select : HTMLElement = document.getElementById("select")!;
    if(select)
    {
      select.addEventListener('change',  function(e){single.getYoutubeData();}, false);
    }
    else
      console.log("not found");




  }

  //Calls website API to retrieve Youtube data from MongoDB based on which channel is provided
  //Param:
  // channel: which Youtube channel source in the database you want data from
  async callYoutubeAPI(channel: string)
  {


      //returns a collection of youtube videos based on which channel you provide
      const result = await this.service.getYoutubeVideos(channel)!;

    //checks which channel you chose and stores the data into the correct container,
    //  Builds a playlist URL from that data,
    //Updates the iframe on the front end with the correct playlist URL
      if (result != null)
      {

        await result.subscribe(async (response) => {
          if(channel == "fox13")
          {
            console.log("fox", response);
            this.foxPlaylist = await this.buildPlaylist(response);
            this.fox13 = response;
            console.log(this.foxPlaylist.toString());
            const iFrame: HTMLIFrameElement = document.getElementById('vidPlayer')! as HTMLIFrameElement;
            iFrame.src = this.foxPlaylist.toString();
          }
          else if(channel == "tampa10")
          {
            console.log("tampa", response);
            this.tampaPlaylist = await this.buildPlaylist(response);
            this.tampa10 = response;
            console.log(this.tampaPlaylist.toString());
            const iFrame: HTMLIFrameElement = document.getElementById('vidPlayer')! as HTMLIFrameElement;
            iFrame.src = this.tampaPlaylist.toString();
          }
          else if(channel == "abcAction")
          {
            console.log("abc", response);
            this.abcPlaylist= await this.buildPlaylist(response);
            this.abcAction = response;
            console.log(this.abcPlaylist.toString());
            const iFrame: HTMLIFrameElement = document.getElementById('vidPlayer')! as HTMLIFrameElement;
            iFrame.src = this.abcPlaylist.toString();
          }
          else if(channel == "wfla8")
          {
            console.log("wfla", response);
            this.wflaPlaylist = await this.buildPlaylist(response);
            this.wfla8 = response;
            console.log(this.wflaPlaylist.toString());
            const iFrame: HTMLIFrameElement = document.getElementById('vidPlayer')! as HTMLIFrameElement;
            iFrame.src = this.wflaPlaylist.toString();
          }
          else if(channel == "general")
          {
            console.log("general", response);
            this.generalPlayList = await this.buildPlaylist(response);
            this.general= response;
            console.log(this.generalPlayList.toString());
            const iFrame: HTMLIFrameElement = document.getElementById('vidPlayer')! as HTMLIFrameElement;
            iFrame.src = this.generalPlayList.toString();
          }


        }, (error) => {
          console.log("error is ", error);
        });
      }
    return;

  }


  //Checks the drop down menu for the selected value and relays it to the website API call to return the desired data
  async getYoutubeData() {
    const select: HTMLSelectElement = document.getElementById("select") as HTMLSelectElement;
    var collection = select.value;
    //const iFrame: HTMLIFrameElement = document.getElementById('vidPlayer')! as HTMLIFrameElement;

    this.callYoutubeAPI(collection);

  }


  //Uses an array of Youtube video data to build a Youtube playlist from the video id codes
  //Returns a URL that works as a playlist in for an iFrame
  //Param:
  // collection: the array of Youtube videos that you wish to create a playlist with
  async buildPlaylist( collection : any )
  {
    let playlist = "";
    const length = Object.keys(collection).length;
    for(let i = 0; i < length; i++)
    {

      var item = collection[i];
      var id = item.id;

      if(i==0)
      {
        playlist = "https://www.youtube.com/embed/" +  id.videoId + "?playlist=" + id.videoId + "," ;
      }
      else if(i == length - 1)
      {
        playlist = playlist + id.videoId;
      }
      else
      {
        playlist = playlist + id.videoId + ",";
      }
    }

    return playlist;
  }

}




