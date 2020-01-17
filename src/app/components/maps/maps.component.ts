import { Component, AfterViewInit, OnInit, OnDestroy } from "@angular/core";
import * as L from "leaflet";
import { LocationService } from "src/app/services/location.service";
import { MapconfigService } from "src/app/services/mapconfig.service";
import { ApiService } from "src/app/services/api.service";
import { stringify } from "querystring";

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.scss"]
})
export class MapsComponent implements OnInit, OnDestroy {
  ngOnInit() {
    this.initMap();
  }

  ngOnDestroy() {
    clearInterval(this.issInterval);
  }

  private issInterval;
  private map;
  hilLon: number = -77.02118;
  hilLat: number = 38.9523;

  constructor(
    private location: LocationService,
    private mapconfig: MapconfigService,
    private apiService: ApiService
  ) {}

  showLocation() {
    clearInterval(this.issInterval);
    
    this.location.getMyLocation().subscribe(position => {
      let lon: number = position.coords.longitude;
      let lat: number = position.coords.latitude;
      console.log("coords = ", lat, lon);

      this.map.off();
      this.map.remove();

      const userIcon = this.mapconfig.getIcon("user");

      const hilIcon = this.mapconfig.getIcon("hil");

      this.map = L.map("map", {
        center: [lat, lon],
        zoom: 7
      });
      this.showWeather();

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

      this.map.fitBounds(group.getBounds().pad(0.1));

      const tiles = this.mapconfig.getTiles();

      tiles.addTo(this.map);
    });
  }

  showIss() {
    
    clearInterval(this.issInterval);

    this.map.off();
    this.map.remove();

    this.map = L.map("map", {
      center: [0, 0],
      zoom: 1
    });
    this.showWeather();
    const urlIssApi = "https://api.wheretheiss.at/v1/satellites/25544";
    const issIcon = this.mapconfig.getIcon("iss");

    const tiles = this.mapconfig.getTiles();
    tiles.addTo(this.map);
    const marker = L.marker([0, 0], { icon: issIcon }).addTo(this.map);

    async function getIssLoc() {
      const response = await fetch(urlIssApi);
      const data = await response.json();
      const { latitude, longitude } = data;
      marker.setLatLng([latitude, longitude]);
      console.log("api");
    }

    this.issInterval = setInterval(getIssLoc, 10000);
  }

  initMap() {
    
    const hilIcon = this.mapconfig.getIcon("hil");

    this.map = L.map("map", {
      center: [this.hilLat, this.hilLon],
      zoom: 9
    });
    this.showWeather();
    const tiles = this.mapconfig.getTiles();

    const marker = L.marker([0, 0], { icon: hilIcon })
      .addTo(this.map)
      .bindTooltip("Hildebrando's Location")
      .openTooltip()
      .setLatLng([this.hilLat, this.hilLon]);

    tiles.addTo(this.map);
  }

  showWeather() {
    var lat: number;
    var lon: number;

    this.map.on("click", async e => {
      var coord = e.latlng;
      lat = coord.lat;
      lon = coord.lng;
      console.log(
        "You clicked on: " +
          lat +
          " and longitude: " +
          lon +
          " right on " +
          e.target
      );

      this.apiService.getWeather(lat, lon).subscribe(
        data => {
          console.log(data);
          let reverseGeo =
            data["reverseGeo"]["results"].length == 0
              ? data["timezone"]
              : `${data["reverseGeo"]["results"][0]["address_components"]["city"]},
                  ${data["reverseGeo"]["results"][0]["address_components"]["state"]},
                  ${data["reverseGeo"]["results"][0]["address_components"]["country"]}`;

          if (!data["error"]) {
            L.popup()
              .setLatLng(e.latlng)
              .setContent(
                `
                <strong>${reverseGeo}</strong><br>
                ${data["currently"]["summary"]}<br>
                ${data["currently"]["temperature"]}&#8457
                feels like ${data["currently"]["apparentTemperature"]}&#8457
              `
              )
              .addTo(this.map)
              .openOn(this.map);
          } 
        },
        err => console.error(err)
      );
    });
  }
}
