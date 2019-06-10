import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlockchainService } from 'src/app/shared/blockchain.service';
import { Coord } from 'src/app/model/coord.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private httpClient: HttpClient, private blockchainService: BlockchainService) {}

  getCoords(ip: string) {
    return this.httpClient
      .get<any>('https://extreme-ip-lookup.com/json/' + ip)
      .toPromise()
      .then(
        response => {
          console.log(response);
          return new Coord(response.lat, response.lon);
        },
        error => {
          console.log(error);
          return null;
        }
      );
  }
  /*
  getIpList(){
    return this.httpClient.get("");
  }*/
}
