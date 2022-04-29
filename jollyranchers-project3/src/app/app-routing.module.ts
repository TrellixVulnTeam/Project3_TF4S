import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home";
import {ForumComponent} from "./forum";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'forum',
    component: ForumComponent,
  }
]

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule]
})
export class AppRoutingModule { };
