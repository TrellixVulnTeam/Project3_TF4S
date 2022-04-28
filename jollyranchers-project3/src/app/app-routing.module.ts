import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { ForumComponent } from './forum';
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [BrowserModule, RouterModule],
  declarations: [
    AppComponent,
    HomeComponent,
    ForumComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };
