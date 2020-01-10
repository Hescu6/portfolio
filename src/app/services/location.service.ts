import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  constructor() {}

  getMyLocation(): Observable<any> {

    return Observable.create( observer => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition( (position) => {
          observer.next(position);
          observer.complete();
        },
        (error) => observer.error(error));
      } else {
        observer.error('Browser Not Supported');
      }
    })
  }
}
