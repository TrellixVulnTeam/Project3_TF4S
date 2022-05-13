import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";


@Component({
  templateUrl: 'forum.component.html', styleUrls:["forum.component.scss"]})
export class ForumComponent
{

  textArea = '';
  private forumPosts : any = [];






  constructor(private service: AppServiceService) { }

  ngOnInit(): void
  {
    const single = this;
    const form : HTMLFormElement = document.getElementById("postForm")! as HTMLFormElement;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      single.submitForm();});

    this.CallForumPostApi();
  }

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

  submitForm()
  {
    //TODO: test to make sure submit button works once fixed
    if(this.checkReqFields())
    {
      //gets all info fields
      const textArea : HTMLTextAreaElement = document.getElementById("textArea")! as HTMLTextAreaElement;
      const location : HTMLInputElement = document.getElementById("location")! as HTMLInputElement;
      const file :HTMLInputElement = document.getElementById("file")! as HTMLInputElement;
      const tag : HTMLInputElement = document.getElementById("tag")! as HTMLInputElement;


      // @ts-ignore
      const image = file.files[0];

      //make formData
      const formData = new FormData();
      formData.append("textArea", textArea.value);
      formData.append("location", location.value);
      formData.append("likeCount", '0');



      if(tag.value != '')
        formData.append("tag", tag.value);
      else
        console.log("no tags uploaded");

      if(image !=null)
      {

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
        fetch("http://ec2-13-59-24-7.us-east-2.compute.amazonaws.com/:8000/api/forum/submit", {
          method: 'POST',
          body: formData

        })
          .then((res) => console.log(res))
          .catch((err) => ("Error occurred"));
        console.log("no image uploaded");
        window.setTimeout(window.location.reload, 500)
      }
    }

  }

  getForumPosts()
  {
    return this.forumPosts;
  }

  getImage(post : any)
  {
    if(post.postNumber != undefined)
    {
      console.log(post);
      return post.image;
    }
  }

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
}

