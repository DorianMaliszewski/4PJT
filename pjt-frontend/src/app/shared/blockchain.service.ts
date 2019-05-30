import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BlockchainService {
  constructor(private httpClient: HttpClient) {}

  public getResource(resourceUrl): Observable<any> {
    const user = localStorage.getItem("currentUser");
    const headers = new HttpHeaders({
      "Content-type": "applicationjson; charset=utf-8",
      Authorization: "Bearer " + JSON.parse(user).token.access_token
    });
    const options = {
      headers
    };
    return this.httpClient.get(resourceUrl, options);
  }

  getBlockchain() {
    this.getResource("/api/blocks").subscribe(
      response => {
        console.log("block : " + response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getPeers() {
    this.getResource("/api/peers").subscribe(
      response => {
        console.log("peer : " + response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getBalance() {
    this.getResource("/api/balance").subscribe(
      response => {
        console.log("balance : " + response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getTransaction() {
    this.getResource("/api/transactions").subscribe(
      response => {
        console.log("trans : " + response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
