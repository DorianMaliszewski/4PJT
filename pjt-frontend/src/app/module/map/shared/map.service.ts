import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BlockchainService } from "src/app/shared/blockchain.service";

@Injectable({
  providedIn: "root"
})
export class MapService {
  constructor(
    private httpClient: HttpClient,
    private blockchainService: BlockchainService
  ) {}

  getCoords(ip: string): Coord {
    this.httpClient.get("https://extreme-ip-lookup.com/json/" + ip).subscribe(
      response => {
        console.log(response);
        return (coord = new Coord(response.lat, response.lon));
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
