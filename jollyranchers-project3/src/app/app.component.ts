import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'jollyranchers-project3';
  path = '';

  constructor(private pathChange: Router) {
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
