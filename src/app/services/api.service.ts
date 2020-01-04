import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  emailApi = 'https://hescu6server.herokuapp.com/api/email'


  sendEmail(data: Object): Promise<Object> {
    const headers = new HttpHeaders();
    headers.set("Content-Type", "application/json");

    return this.httpClient.post(this.emailApi, data, { headers })
      .toPromise();
  }
}
