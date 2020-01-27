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

  getCountryBordersETF(borders:string) {
    return this.httpClient.get(`${environment.API}/borders/${borders}`);
  }

  getCountry (lat:string, lon:string){
    // let geocodeAPI:string = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
    return this.httpClient.get(`${environment.API}/reversegeo/${lat},${lon}`);
    // return this.httpClient.get(geocodeAPI);
  }


  sendEmail(data: Object): Promise<Object> {
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    return this.httpClient.post(this.emailApi, data, { headers })
      .toPromise();
  }

  getStockData (config:Object) {
    return this.httpClient.get(`${environment.API}/api/stock/${config}`);
    // return this.httpClient.get(`http://localhost:3001/api/stock/${config}`);
  }

}
