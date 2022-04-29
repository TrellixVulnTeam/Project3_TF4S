import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

export interface DataRequest{
  source: string
}

@Injectable()
export class DataPullerService {
  constructor(private http: HttpClient) {
  }

  getData(platform: string): Observable<DataRequest> {
    return this.http.get<DataRequest>('http://localhost:8000/api/')
  }
}
