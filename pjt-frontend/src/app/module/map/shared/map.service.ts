import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BlockchainService } from "src/app/shared/blockchain.service";
import { Coord } from "src/app/model/coord.model";

@Injectable({
  providedIn: "root"
})
export class MapService {
  constructor(
    private httpClient: HttpClient,
    private blockchainService: BlockchainService
  ) {}

  getCoords(ip: string) {
    this.httpClient.get("https://extreme-ip-lookup.com/json/" + ip).subscribe(
      response => {
        let coord = new Coord();
        /*coord.lat = response.lat;
        coord.lng = response.lon;*/
        console.log(response);
        //return new Coord(response.lat, response.lon);
      },
      error => {
        console.log(error);
      }
    );
  }
  /*
  getIpList(){
    return this.httpClient.get("");
  }*/
}
