import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AppServiceService} from "./app-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  implements  OnInit{
  title = 'jollyranchers-project3';
  path = '';


  ngOnInit(): void
  {
    this.startup();
  }

  async startup()
  {
    const result = await this.service.connect()!;
  }
  constructor(private pathChange: Router, private service: AppServiceService)
  {
    pathChange.events.subscribe((event)=>{
      if (event instanceof NavigationEnd){
        if (event.url == '/forum'){
          this.path = event.url.split('/')[1];
          console.log(event.url);
        }
        else{
          this.path = '';
        }

      }
    })
  }

}
