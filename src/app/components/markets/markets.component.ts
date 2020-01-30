import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { ApiService } from "src/app/services/api.service";
import { MapconfigService } from "src/app/services/mapconfig.service";
import { StockChartComponent } from "./../stock-chart/stock-chart.component";

@Component({
  selector: "app-markets",
  templateUrl: "./markets.component.html",
  styleUrls: ["./markets.component.scss"]
})


export class MarketsComponent implements OnInit {

  private map;
  stockChartComponent: StockChartComponent;

  constructor(
    private mapconfig: MapconfigService,
    private apiService: ApiService
  ) {
    this.stockChartComponent = new StockChartComponent();
  }


  ngOnInit() {
    this.initMap();
  }


  initMap() {

    //get geoMapping coordinates to make interactive layer on map
    this.apiService.getCountryBordersETF("countryETF").subscribe(
      lines => {
        this.map = L.map("map", {
          center: [0, 0],
          zoom: 1
        });

        const tiles = this.mapconfig.getTiles("toner");

        tiles.addTo(this.map);

        var geojson = L.geoJson(lines).addTo(this.map);

        function highlightFeature(e) {
          var layer = e.target;

          layer.setStyle({
            weight: 5,
            color: "red",
            dashArray: "",
            fillOpacity: 0.3
          });

          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
          }
        }

        function resetHighlight(e) {
          geojson.resetStyle(e.target);
        }

        //zoom to selected region on the map
        const zoomToFeature = e => {
          this.apiService.getCountry(e.latlng.lat, e.latlng.lng).subscribe(
            data => {
              let country = data["address"]["country"];
              console.log(country);

              this.apiService.getStockData(country).subscribe(data => {
                
                let chart = JSON.parse(data["data"]);
                //adds a tooltip to map with the country name
                L.popup()
                  .setLatLng(e.latlng)
                  .setContent(
                    `<strong>${country}</strong><br>`
                    //TODO ADD SYMBOL too
                  )
                  .addTo(this.map)
                  .openOn(this.map);

                  //format the necessary data for chart
                let candleData = {
                  country: `${country} - ${chart["chart"]["result"][0]["meta"]["symbol"]}`,
                  timestamp: chart["chart"]["result"][0]["timestamp"],
                  chart: chart["chart"]["result"][0]["indicators"]["quote"][0]
                };

                this.stockChartComponent.chartItCandle(candleData);
              });
            },
            err => console.error(err)
          );
          this.map.fitBounds(e.sourceTarget.getBounds());
        };

        //initiates actions on events
        function onEachFeature(feature, layer) {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
          });
        }

        geojson = L.geoJson(lines, {
          onEachFeature: onEachFeature
        }).addTo(this.map);
      },
      err => console.error(err)
    );
  }
}
