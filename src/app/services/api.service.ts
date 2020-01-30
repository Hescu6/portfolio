import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  //gets weather information given coordinates to display on map
  getWeather(lat: number, lon: number) {
    return this.httpClient.get(`${environment.API}/weather/${lat},${lon}`);
  }

  //the geocoordinates for the countries that have an ETF available for display on map
  getCountryBordersETF(borders: string) {
    return this.httpClient.get(`${environment.API}/borders/${borders}`);
  }

  //gets country information given a set of coordinates
  getCountry(lat: string, lon: string) {
    return this.httpClient.get(`${environment.API}/reversegeo/${lat},${lon}`);
  }

  //sends post to send email
  sendEmail(data: Object): Promise<Object> {
    const emailApi = `${environment.API}/api/email`;
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    return this.httpClient.post(emailApi, data, { headers }).toPromise();
  }

  //gets historical data from any stock
  getStockData(config: Object) {
    return this.httpClient.get(`${environment.API}/api/stock/${config}`);
  }
}
