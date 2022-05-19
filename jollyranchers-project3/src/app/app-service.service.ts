import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { checkIfTestingLocally } from '../app/home/home.component' //used for changing from localHost to AWS use

//Contains all website API for front end that routes to the correct call to the backend
//All requests are made from their respective component typescript files (i.e. twitter-display.component.ts)
//All backend calls are made to databaseAPI.js in the backend folder
//Uses checkIfTestingLocally() from home.component.ts as stated above in imports
//Authors: Robert Kleszczynski, Fehmi Neffati where labelled

//How to create request routes:
//https://malcoded.com/posts/angular-backend-express/



@Injectable({
  providedIn: 'root'
})
export class AppServiceService
{

  constructor(private http : HttpClient) { }

  //connects to the backend
  async connect()
  {
    //checks if we are hosting on AWS server or local host
    if(checkIfTestingLocally())
    {
      let result = await this.http.get('http://localhost:8000/');
    }
    else
    {
      let result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/');
    }


  }

  //Relays data from MongoDB on the backend to the front end based on which media platform is desired
  //Param:
  // platform: the data source you wish to retrieve data for
  async getData(platform:string)
  {
    let result;
    //based on chosen platform, calls the relevant back end request
    if(platform == "twitter")
    {
      //checks if we are hosting on AWS server or local host
      if(checkIfTestingLocally())
      {
        result = await this.http.get('http://localhost:8000/api/twitter');
      }
      else
      {
        result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/twitter');
      }


      return result;
    }
    else if(platform == "symptoms")
    {
      //checks if we are hosting on AWS server or local host
      if(checkIfTestingLocally())
      {
        result = await this.http.get('http://localhost:8000/api/symptoms');
      }
      else
      {
        result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/symptoms');
      }


      return result;
    }
    else if(platform == "spotify")
    {
      //checks if we are hosting on AWS server or local host
      if(checkIfTestingLocally())
      {
        result = await this.http.get('http://localhost:8000/api/spotify');
      }
      else
      {
        result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/spotify');
      }


      return result;
    }
    //Case by Fehmi Neffati
    else if(platform == "Graphs")
    {
      //checks if we are hosting on AWS server or local host
      if(checkIfTestingLocally())
      {
        result = await this.http.get('http://localhost:8000/api/Graphs');
      }
      else
      {
        result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/Graphs');
      }


      return result;
    }
    else if(platform == "sensorData")
    {
      //checks if we are hosting on AWS server or local host
      if(checkIfTestingLocally())
      {
        result = await this.http.get('http://localhost:8000/api/sensorData');
      }
      else
      {
        result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/sensorData');
      }


      return result;
    }

    else
    {
      console.log("invalid database selected");
      return null;
    }
  }

  //Returns Youtube videos based on specified channel source
  //Param:
  // category: the name of the youtube channel you wish to retrieve video data from.
  // (i.e. 'fox13' for fox news videos on red tide)
  async getYoutubeVideos(category : string)
  {


      let result;
      if(category == "fox13")
      {
        //checks if we are hosting on AWS server or local host
        if(checkIfTestingLocally())
        {
          result = await this.http.get('http://localhost:8000/api/youtube/fox13');
        }
        else
        {
          result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/youtube/fox13');
        }


        return result;
      }
    if(category == "tampa10")
    {
      //checks if we are hosting on AWS server or local host
      if(checkIfTestingLocally())
      {
        result = await this.http.get('http://localhost:8000/api/youtube/tampa10');
      }
      else
      {
        result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/youtube/tampa10');
      }


      return result;
    }
    if(category == "abcAction")
    {
      //checks if we are hosting on AWS server or local host
      if(checkIfTestingLocally())
      {
        result = await this.http.get('http://localhost:8000/api/youtube/abcAction');
      }
      else
      {
        result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/youtube/abcAction');
      }


      return result;
    }
    if(category == "wfla8")
    {
      //checks if we are hosting on AWS server or local host
      if(checkIfTestingLocally())
      {
        result = await this.http.get('http://localhost:8000/api/youtube/wfla8');
      }
      else
      {
        result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/youtube/wfla8');
      }


      return result;
    }
    if(category == "general")
    {
      //checks if we are hosting on AWS server or local host
      if(checkIfTestingLocally())
      {
        result = await this.http.get('http://localhost:8000/api/youtube/general');
      }
      else
      {
        result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/youtube/general');
      }


      return result;
    }
      else
      {
        console.log("invalid database selected");
        return null;
      }
  }

  //Returns Twitter tweet data from MongoDb
  async getTweets()
  {
    let result;
    //checks if we are hosting on AWS server or local host
    if(checkIfTestingLocally())
    {
      result = await this.http.get('http://localhost:8000/api/twitter');
    }
    else
    {
      result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/twitter');
    }


    return result;
  }

  //Returns Podcast data from MongoDb
  async getPodcasts()
  {
    let result;
    ///checks if we are hosting on AWS server or local host
    if(checkIfTestingLocally())
    {
      result = await this.http.get('http://localhost:8000/api/spotify');
    }
    else
    {
      result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/spotify');
    }


    return result;
  }

  //Returns forum posts from MongoDb
  async getForumPosts()
  {
    let result;
    //checks if we are hosting on AWS server or local host
    if(checkIfTestingLocally())
    {
      result = await this.http.get('http://localhost:8000/api/forum/posts');
    }
    else
    {
      result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/forum/posts');
    }


    return result;
  }

  //Returns forum post images from MongoDB
  async getForumPostImage(fileName : string)
  {
    let result;
    //checks if we are hosting on AWS server or local host
    if(checkIfTestingLocally())
    {
      result = await this.http.get('http://localhost:8000/api/forum/posts/images/' + fileName);
    }
    else
    {
      result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/forum/posts/images/' + fileName);
    }


    return result;
  }

  //Returns graphs from MongoDB
  //Author: Fehmi Neffati
  async getGraphs()
  {
    let result;
    //checks if we are hosting on AWS server or local host
    if(checkIfTestingLocally())
    {
      result = await this.http.get('http://localhost:8000/api/Graphs');
    }
    else
    {
      result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/Graphss');
    }


    return result;
  }



  //Returns symptom data from MongoDB
  async getSymptoms()
  {
    let result;
    //checks if we are hosting on AWS server or local host
    if(checkIfTestingLocally())
    {
      result = await this.http.get('http://localhost:8000/api/symptoms');
    }
    else
    {
      result = await this.http.get('http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/symptoms');
    }


    return result;
  }


}
