import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../app-service.service";
import {DomSanitizer, SafeResourceUrl , SafeUrl} from "@angular/platform-browser";
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

//Retrieves historical twitter data graphs from the backend for display on the front end.
//Author: Fehmi Neffati


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  private chartsData: any = [];
  private mentions: number[] = [];
  private counties: String[] = [];
  private myChart : any;
  private myChart2: any;
  private myChart3: any;
  private myChart4: any;


  constructor(private service: AppServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void
  {
    this.callGraphApi();

    console.log(this.counties)





  }

  getSanitizedURL(url: string) {
   //console.log(+url.toString());
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(('data:image/png;base64,'+url));
  }

  async callGraphApi()
  {
    const result = await this.service.getGraphs()!;
    if (result !== null)
    {
      //checks which database you chose and stores the data accordingly
      await result.subscribe(async (response) => {
        this.chartsData = await Promise.resolve(response);
        for (let i = 0; i < this.chartsData.length; i++) {
          this.counties.push(this.chartsData[i].county);
          this.mentions.push(this.chartsData[i].mentions);
        }
        const myChart = new Chart("myChart", {
          type: 'bar',
          data: {
            labels: this.counties,
            datasets: [{
              label: '# of Red Tide Mentions',
              data: this.mentions,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        const myChart2 = new Chart("myChart2", {
          type: 'pie',
          data: {
            labels: this.counties,
            datasets: [{
              label: '# of Red Tide Mentions',
              data: this.mentions,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        const myChart3 = new Chart("myChart3", {
          type: 'radar',
          data: {
            labels: this.counties,
            datasets: [{
              label: '# of Red Tide Mentions',
              data: this.mentions,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        const myChart4 = new Chart("myChart4", {
          type: 'doughnut',
          data: {
            labels: this.counties,
            datasets: [{
              label: '# of Red Tide Mentions',
              data: this.mentions,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });


        return this.chartsData;

      }, (error) => {
        console.log("error is ", error);
      });
    }
    return;

  }

  getGraphsData()
  {
    return this.chartsData;
  }

}
