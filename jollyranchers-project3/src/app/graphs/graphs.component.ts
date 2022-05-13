import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../app-service.service";
import {DomSanitizer, SafeResourceUrl , SafeUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  private graphs: any = [];

  constructor(private service: AppServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void
  {
    //this.callGraphApi();
  }

  getSanitizedURL(url: string) {
    console.log(+url.toString());
    return this.sanitizer.bypassSecurityTrustResourceUrl(('data:image/png;base64,'+url));
  }

  async callGraphApi()
  {
    const result = await this.service.getGraphs()!;
    if (result != null)
    {
      //checks which database you chose and stores the data accordingly
      await result.subscribe(async (response) => {

        console.log("Graphs", response);
        this.graphs =await Promise.resolve(response);
        console.log(this.graphs);
        return this.graphs;

      }, (error) => {
        console.log("error is ", error);
      });
    }
    return;

  }

  getGraphsData()
  {

    return this.graphs;

  }

}
