import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService
{

  constructor(private http : HttpClient) { }

  async getData(platform:string)
  {
    let result;
    if(platform == "twitter")
    {
       result = await this.http.get('http://localhost:8000/api/twitter');
      return result;
    }
    else if(platform == "symptoms")
    {
       result = await this.http.get('http://localhost:8000/api/symptoms');
      return result;
    }
    else if(platform == "spotify")
    {
      result = await this.http.get('http://localhost:8000/api/spotify');
      return result;
    }
    else if(platform == "sensorData")
    {
      result = await this.http.get('http://localhost:8000/api/sensorData');
      return result;
    }

    else
    {
      console.log("invalid database selected");
      return null;
    }
  }

  async getYoutubeVideos(category : string)
  {


      let result;
      if(category == "fox13")
      {
        result = await this.http.get('http://localhost:8000/api/youtube/fox13');
        return result;
      }
    if(category == "tampa10")
    {
      result = await this.http.get('http://localhost:8000/api/youtube/tampa10');
      return result;
    }
    if(category == "abcAction")
    {
      result = await this.http.get('http://localhost:8000/api/youtube/abcAction');
      return result;
    }
    if(category == "wfla8")
    {
      result = await this.http.get('http://localhost:8000/api/youtube/wfla8');
      return result;
    }
    if(category == "general")
    {
      result = await this.http.get('http://localhost:8000/api/youtube/general');
      return result;
    }
      else
      {
        console.log("invalid database selected");
        return null;
      }
  }

  async getTweets()
  {
    let result;
    result = await this.http.get('http://localhost:8000/api/twitter');
    return result;
  }

  async getPodcasts()
  {
    let result;
    result = await this.http.get('http://localhost:8000/api/spotify');
    return result;
  }

  async getSymptoms()
  {
    let result;
    result = await this.http.get('http://localhost:8000/api/symptoms');
    return result;
  }


}
