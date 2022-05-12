import { Component, OnInit } from '@angular/core';
import {AppServiceService} from "../app-service.service";

@Component({
  selector: 'app-symptoms-display',
  templateUrl: './symptoms-display.component.html',
  styleUrls: ['./symptoms-display.component.scss']
})
export class SymptomsDisplayComponent implements OnInit
{
  private symptoms: any = [];

  constructor(private service: AppServiceService) { }

  ngOnInit(): void
  {
    this.callSymptomApi();
  }

  async callSymptomApi()
  {
    const result = await this.service.getSymptoms()!;
    if (result != null)
    {
      //checks which database you chose and stores the data accordingly
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

  getSymptomData()
  {

    return this.symptoms;

  }

}
