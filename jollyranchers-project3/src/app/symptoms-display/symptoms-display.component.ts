import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../app-service.service";

//Calls website API to retrieve Symptoms data from MongoDB to display it on the front end
//API calls are made to App-service.service.ts
//Author: Robert Kleszczysnki

@Component({
  selector: 'app-symptoms-display',
  templateUrl: './symptoms-display.component.html',
  styleUrls: ['./symptoms-display.component.scss']
})
export class SymptomsDisplayComponent implements OnInit
{
  private symptoms: any = [];

  constructor(private service: AppServiceService) { }

  //Runs on startup to get symptoms data
  ngOnInit(): void
  {
    this.callSymptomApi();
  }

  //Calls website API to retrieve Symptoms Data from MongoDB and stores it in an array
  async callSymptomApi()
  {
    const result = await this.service.getSymptoms()!;
    if (result !== null)
    {
      //stores symptoms data into symptoms variable
      await result.subscribe(async (response) => {

        console.log("symptoms", response);
        this.symptoms = response;
        return this.symptoms;



      }, (error) => {
        console.log("error is ", error);
      });
    }
    return;

  }

  //Returns symptoms data to front end
  getSymptomData()
  {

    return this.symptoms;

  }

}
