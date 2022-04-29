import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { YoutubeDisplayComponent } from './youtube-display/youtube-display.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import {FormsModule} from "@angular/forms";
import { TwitterDisplayComponent } from './twitter-display/twitter-display.component';
import { SpotifyDisplayComponent } from './spotify-display/spotify-display.component';
import { SymptomsDisplayComponent } from './symptoms-display/symptoms-display.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeDisplayComponent,
    HomeComponent,
    ForumComponent,
    TwitterDisplayComponent,
    SpotifyDisplayComponent,
    SymptomsDisplayComponent
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
