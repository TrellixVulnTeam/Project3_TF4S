import {Component, OnInit} from '@angular/core';
import {AppServiceService} from "../app-service.service";

@Component({
    templateUrl: 'forum.component.html', styleUrls:["forum.component.scss"]})
export class ForumComponent
{

  private forumPosts : any = [];



  constructor(private service: AppServiceService) { }

  ngOnInit(): void
  {

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



}

