import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { DataPullerComponent } from './data-puller/data-puller.component';
import { YoutubeDisplayComponent } from './youtube-display/youtube-display.component';

@NgModule({
  declarations: [
    AppComponent,
    DataPullerComponent,
    YoutubeDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
