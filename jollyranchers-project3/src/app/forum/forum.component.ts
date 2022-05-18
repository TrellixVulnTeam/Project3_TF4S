import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";

//Responsible for managing Posting to the Forum and Retrieving Posts from the Forum
//API calls are made to App-service.service.ts
//Author: Robert Kleszczynski

@Component({
  templateUrl: 'forum.component.html', styleUrls:["forum.component.scss"]})
export class ForumComponent
{

  textArea = '';
  private forumPosts : any = [];






  constructor(private service: AppServiceService) { }

  //On initialization, adds an even listener to the submit button so form submission is possible
  ngOnInit(): void
  {
    const single = this;
    const form : HTMLFormElement = document.getElementById("postForm")! as HTMLFormElement;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      single.submitForm();});

    this.CallForumPostApi();
  }

  //Retrieves Forum Posts from MongoDB
  async CallForumPostApi()
  {


    const result = await this.service.getForumPosts()!;

    if (result != null)
    {
      //checks which database you chose and stores the data accordingly
      await result.subscribe(async (response) =>
      {

        this.forumPosts = response;
        console.log("posts", response);

        const length = Object.keys(this.forumPosts).length;
        console.log(length);
        for(let i = 0; i < length; i++)
        {

          //checks if each post has an image attached to it and retrieves the image if it has one
          if(this.forumPosts[i].hasOwnProperty('postNumber'))
          {
            const url =  "http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/forum/posts/images/" + this.forumPosts[i].postNumber;
            this.forumPosts[i]['image'] =  url;
          }
          else
            this.forumPosts[i]['image'] =  undefined;
        }

        return this.forumPosts;

      }, (error) => {
        console.log("error is ", error);
      });
    }
    else
    {
      console.log("Forum Posts not found")
      return;
    }



  }

  //Sends form Data to be uploaded to the forumPosts database
  //Called when submit button is clicked.
  submitForm()
  {
    //Checks to see if the text content and a location have been provided
    //if true, posts the content to DB
    if(this.checkReqFields())
    {

      //gets all info fields
      const textArea : HTMLTextAreaElement = document.getElementById("textArea")! as HTMLTextAreaElement;
      const location : HTMLInputElement = document.getElementById("location")! as HTMLInputElement;
      const file :HTMLInputElement = document.getElementById("file")! as HTMLInputElement;
      const tag : HTMLInputElement = document.getElementById("tag")! as HTMLInputElement;


      //gets an image if there is one, otherwise just null
      // @ts-ignore
      const image = file.files[0];

      //make formData
      const formData = new FormData();
      formData.append("textArea", textArea.value);
      formData.append("location", location.value);
      formData.append("likeCount", '0');
      formData.append("datePosted", this.getDate());



      //checks if tags exist before adding
      if(tag.value != '')
        formData.append("tag", tag.value);
      else
        console.log("no tags uploaded");

      //checks if image is attached before making API call to appropriate post methods
      //Will either post image with the form data
      //or post a text only entry of the form data to the database
      if(image !=null || image != undefined)
      {
        console.log("image post");
        formData.append("file", image);
        fetch("http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/forum/submitImg", {
          method: 'POST',
          body: formData

        })
          .then((res) => console.log(res))
          .catch((err) => ("Error occurred"));

      }
      else
      {
        console.log("text only post");
        fetch("http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/forum/submit", {
          method: 'POST',
          body: formData

        })
          .then((res) => console.log(res))
          .catch((err) => ("Error occurred"));
        console.log("no image uploaded");
        //window.setTimeout(window.location.reload, 500);
      }
    }

  }

  //Returns forum posts to front end
  getForumPosts()
  {
    
    let posts = this.forumPosts.sort((a: { datePosted: string; }, b: { datePosted: string; }) => (a.datePosted > b.datePosted) ? 1 : -1)
    return posts;
  }

  //returns image to front end
  getImage(post : any)
  {
    if(post.postNumber != undefined)
    {
      console.log("has image");
      return post.image;
    }
    else
    {
      console.log("has no image");
      const url =  "http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com:8000/api/forum/posts/images/2022-05-17-23:2:57";
      return url;
    }
  }

  //Checks if user has provided text content and a location in order to post
  //Otherwise displays red text to signify which text fields are required before submission
  //if false, stops the call to post to forum database
  checkReqFields()
  {
    var returnValue;
    // @ts-ignore
    var text = document.getElementById("textArea").value;
    // @ts-ignore
    var location = document.getElementById("location").value;

    returnValue = true;
    // checks the text
    if (text.trim() == "") {
      // @ts-ignore
      document.getElementById("reqtextArea").innerHTML = "* Text is required.";
      returnValue = false;
    }
    // checks the location
    if (location.trim() == "") {
      // @ts-ignore
      document.getElementById("reqLocation").innerHTML = "* Location is required.";
      returnValue = false;
    }
    console.log(returnValue);
    return returnValue;
  }

  getDate()
  {
    let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
    let year = date_ob.getFullYear();

  // current hours
    let hours = date_ob.getHours();
    hours = Number.parseInt(this.checkDigits(hours.toString()));

  // current minutes
    let minutes = date_ob.getMinutes();
    minutes = Number.parseInt(this.checkDigits(minutes.toString()));


  // current seconds
    let seconds = date_ob.getSeconds();
    seconds = Number.parseInt(this.checkDigits(seconds.toString()));


    console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds)
    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
  }

  //Checks to make sure numbers are displayed correctly on time posted (i.e not 9:30, but 09:30)
  checkDigits(number : string)
  {
    if(number.length < 2)
    {
      let output = "0";
      output = output + number;
      return output;
    }
    else
      return number;
  }
}

