import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../app-service.service";
import {single} from "rxjs";



@Component({
  selector: 'app-youtube-display',
  templateUrl: './youtube-display.component.html',
  styleUrls: ['./youtube-display.component.scss']
})
export class YoutubeDisplayComponent implements OnInit
{
  private fox13: any = [];
  private tampa10: any = [];
  private abcAction: any = [];
  private wfla8: any = [];
  private general: any = [];

  private foxPlaylist : any = [];
  private tampaPlaylist: any = [];
  private abcPlaylist : any = [];
  private wflaPlaylist : any = [];
  private generalPlayList : any = [];



  constructor(private service: AppServiceService) { }

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

  async callYoutubeAPI(channel: string)
  {


      const result = await this.service.getYoutubeVideos(channel)!;

      if (result != null)
      {
        //checks which database you chose and stores the data accordingly
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


    //return playlist;

    /*await this.delay(10);

     const result2 = await this.service.getYoutubeVideos("tampa10")!;

        if (result2 != null) {
          //checks which database you chose and stores the data accordingly
          result2.subscribe((response) => {
            console.log("tampa", response);
            this.tampaPlaylist = this.buildPlaylist(response);
            this.tampa10 = response;
            console.log(this.tampaPlaylist.toString());

          }, (error) => {
            console.log("error is ", error);
          });
        }



    await this.delay(10);

    const result3 = await this.service.getYoutubeVideos("abcAction")!;
    if (result3 != null) {
      //checks which database you chose and stores the data accordingly
      result3.subscribe((response) => {
        console.log("abc", response);
        this.abcPlaylist = this.buildPlaylist(response);
        this.abcAction = response;
        console.log(this.abcAction.toString());
      }, (error) => {
        console.log("error is ", error);
      });
    }

    await this.delay(10);

    const result4 = await this.service.getYoutubeVideos("wfla8")!;
    if (result4 != null) {
      //checks which database you chose and stores the data accordingly
      result4.subscribe((response) => {
        console.log("wfla8", response);
        this.wflaPlaylist = this.buildPlaylist(response);
        this.wfla8 = response;
        console.log(this.wflaPlaylist.toString());
      }, (error) => {
        console.log("error is ", error);
      });
    }

    await this.delay(10);

    const result5 = await this.service.getYoutubeVideos("general")!;
    if (result5 != null) {
      //checks which database you chose and stores the data accordingly
      result5.subscribe((response) => {
        console.log("general", response);
        this.generalPlayList = this.buildPlaylist(response);
        this.general = response;
        console.log(this.generalPlayList.toString());
      }, (error) => {
        console.log("error is ", error);
      });
    }*/

  }


  async getYoutubeData() {
    const select: HTMLSelectElement = document.getElementById("select") as HTMLSelectElement;
    var collection = select.value;
    const iFrame: HTMLIFrameElement = document.getElementById('vidPlayer')! as HTMLIFrameElement;

    this.callYoutubeAPI(collection);

    if (collection == "fox13")
    {


        console.log(this.foxPlaylist.toString());
       //iFrame.src = this.foxPlaylist.toString();



      return this.fox13;


    }
    if (collection == "tampa10") {

      let playlist = this.buildPlaylist(this.tampa10)

      iFrame.src = this.tampaPlaylist.toString();
      return this.tampa10;
    }
    if (collection == "abcAction") {
      let playlist = this.buildPlaylist(this.abcAction)
      console.log(playlist);
      iFrame.src = playlist.toString();
      return this.abcAction;
    }
    if (collection == "wfla8") {
      let playlist = this.buildPlaylist(this.wfla8);
      console.log(playlist);
      iFrame.src = playlist.toString();
      return this.wfla8;
    }
    if (collection == "general") {
      let playlist = this.buildPlaylist(this.general)
      console.log(playlist);
      iFrame.src = playlist.toString();
      return this.general;
    }
  }

  delay(ms: number)
  {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

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




