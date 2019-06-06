import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {forEach} from '@angular-devkit/schematics';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {


  private blocks: [];
  private transactions: [];
    transactionSubject = new Subject<any[]>();
    blockchainSubject = new Subject<any[]>();

    emitBlock() {
      this.blockchainSubject.next(this.blocks.slice());
    }

    emitTransaction(){
        this.transactionSubject.next(this.transactions.slice());
    }
  constructor(private httpClient: HttpClient,
              private toastr: ToastrService) { }

    public getResource(resourceUrl): Observable<any> {
        const user = localStorage.getItem('currentUser');
        const headers = new HttpHeaders({
            'Content-type': 'applicationjson; charset=utf-8',
            Authorization: 'Bearer ' + JSON.parse(user).token.access_token
        });
        const options = {
            headers
        };
        return this.httpClient.get(resourceUrl, options);
    }

    getBlockchain() {
        this.getResource('/api/blocks').subscribe(
            response => {
              this.blocks = response;
              // console.log(response);
              this.emitBlock();
            },
            error => {
                console.log(error);
            }
        );

    }

    getPeers() {
        this.getResource('/api/peers').subscribe(
            response => {

                console.log('peer : ' + response);
            },
            error => {
                console.log(error);
            }
        );
    }

    getBalance() {
        this.getResource('/api/balance').subscribe(
            response => {
                console.log('balance : ' + response);
            },
            error => {
                console.log(error);
            }
        );
    }

    getTransaction() {
        this.getResource('/api/transactions').subscribe(
            response => {
                this.transactions = response;
                this.emitTransaction();
                console.log('trans : ' + response);
            },
            error => {
                console.log(error);
            }
        );
    }

}
