import { Component, AfterViewInit, OnInit } from "@angular/core";
import * as L from "leaflet";
import { LocationService } from "src/app/services/location.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.scss"]
})
export class MapsComponent implements OnInit {
  ngOnInit() {
    this.initMap();
  }
  private map;
  hilLon: number = -77.02118;
  hilLat: number = 38.9523;

  constructor(private location: LocationService) {}

  showLocation() {
    this.map.off();
    this.map.remove();
    this.location.getMyLocation().subscribe(position => {
      let lon: number = position.coords.longitude;
      let lat: number = position.coords.latitude;
      console.log("coords = ", lat, lon);

      const userIcon = L.icon({
        iconUrl: "assets/icons/userlocation.png",
        iconSize: [25, 25]
      });

      const hilIcon = L.icon({
        iconUrl: "assets/icons/hillocation.png",
        iconSize: [24, 24]
      });

      this.map = L.map("map", {
        center: [lat, lon],
        zoom: 7
      });

      const hilmarker = L.marker([0, 0], { icon: hilIcon })
        .addTo(this.map)
        .bindTooltip("Hildebrando's Location")
        .openTooltip()
        .setLatLng([this.hilLat, this.hilLon]);

      const usermarker = L.marker([0, 0], { icon: userIcon })
        .addTo(this.map)
        .bindTooltip("Your Location")
        .openTooltip()
        .setLatLng([lat, lon]);

      let group = L.featureGroup([hilmarker, usermarker]);

      this.map.fitBounds(group.getBounds());

      const tiles = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      );

      tiles.addTo(this.map);
    });
  }

  initMap() {
    const hilIcon = L.icon({
      iconUrl: "assets/icons/hillocation.png",
      iconSize: [24, 24]
    });

    this.map = L.map("map", {
      center: [this.hilLat, this.hilLon],
      zoom: 7
    });


    var tiles = L.tileLayer(`https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${environment.THUNDERFOREST_API_KEY}`, {
      attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      apikey: environment.THUNDERFOREST_API_KEY,
      maxZoom: 22
    });


    const marker = L.marker([0, 0], { icon: hilIcon })
      .addTo(this.map)
      .bindTooltip("Hildebrando's Location")
      .openTooltip()
      .setLatLng([this.hilLat, this.hilLon]);
    
    
      const tiles2 = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    );

    tiles.addTo(this.map);
  }
}
