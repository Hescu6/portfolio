import { Injectable } from "@angular/core";
import { LocationService } from "src/app/services/location.service";
import * as L from "leaflet";

@Injectable({
  providedIn: "root"
})
export class MapconfigService {
  getTiles(tileSrc?: string) {
    switch (tileSrc) {
      case "openstreetmap": {
        return L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            maxZoom: 19,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
        );
      }

      case "toner": {
        return L.tileLayer(
          "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}",
          {
            attribution:
              'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: "abcd",
            minZoom: 0,
            maxZoom: 20,
            ext: "png"
          }
        );
      }

      case "watercolor": {
        return L.tileLayer(
          "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
          {
            attribution:
              'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: "abcd",
            minZoom: 1,
            maxZoom: 16,
            ext: "jpg"
          }
        );
      }

      default: {
        return L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 19
          }
        );
      }
    }
  }

  getIcon(iconSrc: string) {
    switch (iconSrc) {
      case "hil": {
        return L.icon({
          iconUrl: "assets/icons/hillocation.png",
          iconSize: [24, 24]
        });
      }

      case "user": {
        return L.icon({
          iconUrl: "assets/icons/userlocation.png",
          iconSize: [25, 25]
        });
      }

      case "iss": {
        return L.icon({
          iconUrl: "assets/icons/iss.png",
          iconSize: [75, 47]
        });
      }

      default: {
        break;
      }
    }
  }
}
