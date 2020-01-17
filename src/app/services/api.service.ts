import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  emailApi = `${environment.API}/api/email`

  getWeather(lat:number, lon:number) {
    return this.httpClient.get(`${environment.API}/weather/${lat},${lon}`);
  }


  sendEmail(data: Object): Promise<Object> {
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    return this.httpClient.post(this.emailApi, data, { headers })
      .toPromise();
  }
}
