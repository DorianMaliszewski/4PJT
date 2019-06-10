import { Component, OnInit } from '@angular/core';
import { MapService } from './shared/map.service';
import { Coord } from 'src/app/model/coord.model';
import { BlockchainService } from 'src/app/shared/blockchain.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public title = '';
  coords: Coord[] = [];

  ipaddress: [];
  peerSubscription: Subscription;
  peers = [];

  lat: number = 45.74846;
  lng: number = 4.84671;

  constructor(private mapService: MapService, private blockchainService: BlockchainService) {}

  ngOnInit() {
    this.peerSubscription = this.blockchainService.peersSubject.subscribe((peers: [string]) => {
      peers.forEach(peer => {
        let ip = '';
        if (peer.startsWith('::ffff:')) {
          ip = peer.split(':')[3];
        } else {
          ip = peer.split(':')[0];
        }
        this.mapService.getCoords(ip).then(coord => {
          if (coord) {
            this.coords.push(coord);
          }
        });
      });
    });
  }
}
