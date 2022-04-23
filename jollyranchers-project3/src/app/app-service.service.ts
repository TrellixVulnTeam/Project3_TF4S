import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

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
    else if(platform == "youtube")
    {
      result = await this.http.get('http://localhost:8000/api/youtube');
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
}
