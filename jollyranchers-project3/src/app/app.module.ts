import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { DataPullerComponent } from './data-puller/data-puller.component';
import { YoutubeDisplayComponent } from './youtube-display/youtube-display.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DataPullerComponent,
    YoutubeDisplayComponent,
    HomeComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
