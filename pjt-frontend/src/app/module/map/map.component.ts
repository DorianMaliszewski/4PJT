import { Component, OnInit } from "@angular/core";
import { MapService } from "./shared/map.service";
import { Coord } from "src/app/model/coord.model";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  coords: Coord[] = [
    {
      lat: 45.74846,
      lng: 4.84671
    },
    {
      lat: 46.74846,
      lng: 3.84671
    }
  ];

  ipaddress: ["91.207.208.153", "91.210.208.153"];

  lat: number = 45.74846;
  lng: number = 4.84671;
  constructor(private MapService: MapService) {}

  ngOnInit() {
    /*this.ipaddress.forEach(element => {
      this.MapService.getCoords(element);
    });*/
    //this.MapService.getCoords("91.207.208.153");
  }
}
