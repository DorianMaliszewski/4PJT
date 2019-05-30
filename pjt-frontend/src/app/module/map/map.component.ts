import { Component, OnInit } from '@angular/core';
import { MapService } from './shared/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  list: [
    {latitude: 50.678418, longitude: 7.809007},
    {latitude: 5.678418, longitude: 7.809007},
    {latitude: 30.678418, longitude: 15.809007}
    ];
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(private MapService: MapService) { }

  ngOnInit() {
  }



}
