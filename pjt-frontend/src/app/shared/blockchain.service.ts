import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BlockchainService {
  blocksSubject = new Subject<any[]>();

  private blocks = [];

  constructor(private httpClient: HttpClient) {}

  emitBlocksSubject() {
    this.blocksSubject.next(this.blocks.slice());
  }

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
    this.getResource("/api/blocks")
      .toPromise()
      .then(
        response => {
          this.blocks = response;
          console.log(this.blocks);
          this.emitBlocksSubject();
        },
        error => {
          console.log(error);
        }
      );
  }

  getPeers(): any {
    this.getResource("/api/peers").subscribe(
      response => {
        console.log("peer : " + response);
        return response;
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

  getTransactionByBlock(block: any) {}
}
