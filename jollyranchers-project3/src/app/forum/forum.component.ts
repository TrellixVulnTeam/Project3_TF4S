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
  }

  async getForumPosts(channel: string)
  {


    const result = await this.service.getForumPosts()!;

    if (result != null)
    {
      //checks which database you chose and stores the data accordingly
      await result.subscribe(async (response) =>
      {
          console.log("posts", response);
          this.forumPosts = response;

      }, (error) => {
        console.log("error is ", error);
      });
    }
    return;

  }

  submitForm()
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



    if(tag.value != '')
      formData.append("tag", tag.value);
    else
      console.log("no tags uploaded");

    if(image !=null)
    {

      formData.append("file", image);
      fetch("http://localhost:8000/api/forum/submitImg", {
        method: 'POST',
        body: formData

      })
        .then((res) => console.log(res))
        .catch((err) => ("Error occurred"));
    }
    else
    {
      fetch("http://localhost:8000/api/forum/submitImg", {
        method: 'POST',
        body: formData

      })
        .then((res) => console.log(res))
        .catch((err) => ("Error occurred"));
      console.log("no image uploaded");
    }



  }


}

