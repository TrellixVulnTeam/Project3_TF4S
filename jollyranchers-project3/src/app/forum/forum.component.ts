import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";
import { checkIfTestingLocally } from '../home/home.component' //used for changing from localHost to AWS use

//Responsible for managing Posting to the Forum and Retrieving Posts from the Forum
//API calls are made to App-service.service.ts
//Uses checkIfTestingLocally() from home.component.ts as stated above in imports
//Author: Robert Kleszczynski

@Component({
  selector: 'app-forum',
  templateUrl: 'forum.component.html',
  styleUrls:["forum.component.scss"]})
export class ForumComponent
{
  // textArea variable is to check the characters typed to the post text area
  textArea = '';
  private forumPosts : any = [];
  private map1 : any = new Map();
  private map2 : any = new Map();


  constructor(private service: AppServiceService) { }

  //On initialization, adds an even listener to the submit button so form submission is possible
  ngOnInit(): void
  {
    const single = this;
    const form : HTMLFormElement = document.getElementById("postForm")! as HTMLFormElement;

    //https://stackoverflow.com/questions/63455218/how-to-pass-arguments-to-addeventlistener-listener-function-with-typescript
    form.addEventListener("submit", function(e){
      e.preventDefault();
      single.submitForm();
    });

    this.CallForumPostApi();
    this.cleanPostsData();
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
          //https://dmitripavlutin.com/check-if-object-has-property-javascript/
          if(this.forumPosts[i].hasOwnProperty('postNumber'))
          {

            let url;
            //checks if we are hosting on AWS server or local host
            if(checkIfTestingLocally())
            {
              url =  "http://localhost:8000/api/forum/posts/images/" + this.forumPosts[i].postNumber;
            }
            else
            {
              url =  "http://ec2-3-135-231-108.us-east-2.compute.amazonaws.com:8000/api/forum/posts/images/" + this.forumPosts[i].postNumber;
            }


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
      //https://stackoverflow.com/questions/17543064/putting-input-file-into-formdata-jquery-to-submit-to-php
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

        //checks if we are hosting on AWS server or local host
        if(checkIfTestingLocally())
        {
          fetch("http://localhost:8000/api/forum/submitImg", {
            method: 'POST',
            body: formData

          })
            .then((res) => console.log(res))
            .catch((err) => ("Error occurred"));
        }
        else
        {
            fetch("http://ec2-3-135-231-108.us-east-2.compute.amazonaws.com:8000/api/forum/submitImg", {
              method: 'POST',
              body: formData

            })
              .then((res) => console.log(res))
              .catch((err) => ("Error occurred"));
        }


      }
      else
      {
        console.log("text only post");

        //checks if we are hosting on AWS server or local host
        if(checkIfTestingLocally())
        {
          fetch("http://localhost:8000/api/forum/submit", {
            method: 'POST',
            body: formData

          })
            .then((res) => console.log(res))
            .catch((err) => ("Error occurred"));
          console.log("no image uploaded");
        }
        else
        {
          fetch("http://ec2-3-135-231-108.us-east-2.compute.amazonaws.com:8000/api/forum/submit", {
            method: 'POST',
            body: formData

          })
            .then((res) => console.log(res))
            .catch((err) => ("Error occurred"));
          console.log("no image uploaded");
        }

        window.setTimeout(window.location.reload, 500);
      }
    }

  }

  //Returns forum posts to front end
  getForumPosts()
  {
    let posts = this.forumPosts.sort((a: { datePosted: string; }, b: { datePosted: string; }) => (a.datePosted > b.datePosted) ? -1 : 1)
    return posts;
  }

  //returns image to front end if there is any connected to the post
  //Param:
  // post: the forum post that you wish to obtain an image for
  getImage(post : any)
  {
    if(post.postNumber != undefined)
    {
      //console.log("has image");
      return post.image;
    }
    else
    {
      //console.log("has no image");
      //checks if we are hosting on AWS server or local host
      let url;
      if(checkIfTestingLocally())
      {
        url =  "http://localhost:8000/api/forum/posts/images/2022-05-17-23:2:57";
      }
      else
      {
        url =  "http://ec2-3-135-231-108.us-east-2.compute.amazonaws.com:8000/api/forum/posts/images/2022-05-17-23:2:57";
      }

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

  //returns a time stamp for the time of posting the new forum post
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

  //Checks to make sure numbers are displayed correctly on time posted (i.e not 9:3, but 09:03)
  //Param:
  // number the substring from date that we wish to check the formatting of (i.e. hours could be "9" and we fix it to "09")
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


  //called when a forum post's like button is clicked in HTML
  //increments the likeCount that is displayed and then updates the likeCount of the post
  //Param:
  //post : the target post that we wish to update the likeCount on
  async incrementLike( post : any)
  {


    //gets the front end button for the forum post and disables it on mouse click so you can't like multiple times.
    const likeButton : HTMLButtonElement = document.getElementById(this.getLikeButtonID(post))! as HTMLButtonElement
    likeButton.disabled = true;

    //increments the like count and displays the new amount on the front end
    let likeCount = parseInt(post.likeCount.toString()) + 1;
    const likeText : HTMLParagraphElement = document.getElementById(this.getCounterID(post))! as HTMLParagraphElement;
    likeText.innerHTML = likeCount.toString();

    //updates the likeCount on MongoDB
    const result = await this.service.updatePostLikeCount(post._id.toString(), likeCount.toString())!;
    if (result != null)
    {
      //checks which database you chose and stores the data accordingly
      await result.subscribe(async (response) =>
      {

      }, (error) => {
        console.log("error is ", error);
      });
    }
    else
    {
      console.log("Forum Posts not found")
      return;
    }


    console.log("like updated");


  }

  //Names likeCounter Paragraph element in HTML a unique identifier
  //allows us to change each like element independently when a like button is clicked
  //Param:
  // post : the forum post's datePosted property is used as part of the unique identifier of the likeCounter text element
  getCounterID(post : any)
  {
    let name = "like";
    name = name + post.datePosted.toString();
    return name;
  }

  //Names likeButton button element in HTML a unique identifier
  //allows us to change each like button's enabled state  independently when a like button is clicked
  //Param:
  // post : the forum post's datePosted property is used as part of the unique identifier of the likeButton button element
  getLikeButtonID(post : any)
  {
    let name = "likeButton";
    name = name + post.datePosted.toString();
    return name;

  }


  /***
   Forum post  format:
   textArea : "test3"
   location : "Lee County" <--------- What I need
   likeCount : "7"
   datePosted :"2022-05-17 22:20:57"
   tag : "dd"

   What I want to do:
    - Get all Forum posts from the Database
    - Set a data structure that would keep track of how many times each county has been mentioned
    - Rank the counties based on how many times they were mentioned
    - Take the top 10 counties
    - use the Name and the counter number as data to feed into the graphs in graphs.ts file
   */
  async cleanPostsData(){
    // const map = new Map();

    /***
     What I want to do is:
     - Make first map
     - Save all of the mentions in it in the form : ( County : # of Mentions)
     - Make a second map
     - Get all of the 1st Map Keys
     - For Every key:
        get value of that key
        put that value in the new map as a key
        put the key in the new map as value
    KEEP IN MIND THAT 2 COUNTIES COULD HAVE THE SAME VALUE
     -----------------------------------------

     HERE WE WANT TO SORT
     get all keys
     put them in an array
     sort Array
     Loop through array and get the values(County) corresponding to each item of the array ( # of mentions)
     We could either : - make 2 arrays with corresponding indexes and return in to the Graphs component
                  OR : - Return a new map that has 10 items in it (County name : # of Mentions
     ------------------------------------------------------------------------------------------------------------------
    A different way:
      - Get all values,
      - sort them
      - iterate through map
      - if any given value is less than the sorted list value's smallest value
      - drop it from the hashmap


    THIS IS NOT GOING TO WORK IN TYPESCRIPT -> SWITCHING TO PYTHON
     */

    for (let i = 0; i < this.forumPosts.length; i++) {
      this.map1.set(this.forumPosts.get(i).location, 0);
      console.log(this.map1.get(this.forumPosts.get(i).location));
      console.log("Hello from the forum")
    }
    /***for (let i = 0; i < this.forumPosts.length; i++) {
      this.map1.set(this.forumPosts.get(i).location, this.map1.get(this.forumPosts.get(i).location) + 1);
      console.log(this.map1.get(this.forumPosts.get(i).location.toString()));
    }
    let values = this.map1.keys
    console.log("before");
    console.log(values);
    values = values.sort();
    console.log("after:");
    console.log(values)*/


  }
}

