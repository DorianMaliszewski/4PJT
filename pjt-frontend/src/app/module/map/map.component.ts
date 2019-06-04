import { Component, OnInit } from "@angular/core";
import { MapService } from "./shared/map.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  coords: Coord[];
  ipaddress: ["91.207.208.153", "91.210.208.153"];

  lat: number = 45.74846;
  lng: number = 4.84671;
  constructor(private MapService: MapService) {}

  ngOnInit() {
    this.MapService.getCoords("91.207.208.153");
  }
}
