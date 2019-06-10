import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Peer } from '../model/peer.model';
import { Link } from '../model/link.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  blocksSubject = new Subject<any[]>();
  peersSubject = new Subject<any[]>();
  linksSubject = new Subject<any[]>();

  private blocks = [];
  private peers = [];
  private links = [];

  constructor(private httpClient: HttpClient) {}

  emitBlocksSubject() {
    this.blocksSubject.next(this.blocks.slice());
  }

  emitPeersSubject() {
    this.peersSubject.next(this.peers.slice());
  }

  emitLinksSubject() {
    this.linksSubject.next(this.links.slice());
  }

  public getResource(resourceUrl): Observable<any> {
    const user = localStorage.getItem('currentUser');
    const headers = new HttpHeaders({
      'Content-type': 'applicationjson; charset=utf-8',
      Authorization: 'Bearer ' + JSON.parse(user).token
    });
    const options = {
      headers
    };
    return this.httpClient.get(environment.server_url + resourceUrl, options);
  }

  getBlockchain() {
    this.getResource('/blocks')
      .toPromise()
      .then(
        response => {
          this.blocks = response;
          this.emitBlocksSubject();
        },
        error => {
          console.log(error);
        }
      );
  }

  getPeers() {
    this.getResource('/peers')
      .toPromise()
      .then(
        response => {
          let el = 0;
          for (let i = 0; i < response.length; i++) {
            const node = new Peer(response[i], response[i]);
            // tslint:disable-next-line: no-unused-expression
            if (!this.verifDoubleNode(node)) {
              this.peers.push(node);
              this.emitPeersSubject();
              console.log(i);
            }
            if (el === 0) {
              console.log(i);
              const link = new Link(
                this.getRandomId(),
                response[i],
                response[i + 1],
                'custom label'
              );
              this.links.push(link);

              this.emitLinksSubject();
              el++;
            } else {
              console.log('else');
              console.log(i);
              el = 0;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getRandomId(): string {
    return Math.random()
      .toString(36)
      .substring(7);
  }

  // tslint:disable-next-line: ban-types
  verifDoubleNode(node: Peer): Boolean {
    let find = false;
    this.peers.forEach(element => {
      if (element.id === node.id) {
        find = true;
      }
    });
    return find;
  }

  getBalance() {
    this.getResource('/balance').subscribe(
      response => {
        console.log('balance : ' + response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getTransactionByBlock(block: any) {}
}
