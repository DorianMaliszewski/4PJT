import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/shared/login.service';
import {BlockchainService} from '../blockchain/shared/blockchain.service';
import {Transaction} from './transaction';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

    blocks: any[];
    block: any;
    blocksSubscription: Subscription;
    transactions: Transaction[];
    idDetail: int;
    searchResult = [];
    searchValue =  '';
    constructor(private blockchainService: BlockchainService,
                private route: ActivatedRoute, private router: Router){
    }


  ngOnInit() {

          this.blocksSubscription = this.blockchainService.blockchainSubject.subscribe(
              (blocks: any[]) => {
                  this.blocks = blocks;
                  this.getAllTransactions();
              }
          );
          this.blockchainService.getBlockchain();
      }


  getAllTransactions() {
        this.searchResult = [];
        this.searchValue = '';
        this.transactions = Array<Transaction>();
        // list des blocks
        for (let i = 0; i < this.blocks.length; i++) {
          //console.log('ok');

            // list de data
            for (let j = 0; j < this.blocks[i].data.length; j++) {
                for (let h = 0; h < this.blocks[i].data[j].txOuts.length; h++) {
                    let trans = new Transaction();
                    if (this.blocks[i].data[j].txIns[0].txOutId === '') {
                        trans.sender = 'recompense';
                    } else {
                        trans.sender = this.blocks[i].data[j].txIns[0].txOutId;
                    }

                    trans.recipient = this.blocks[i].data[j].txOuts[h].address;
                    trans.amount = this.blocks[i].data[j].txOuts[h].amount;
                    // console.log(trans);
                    this.transactions.push(trans);
                    // console.log('transaction : sender' + trans.sender + ' recipient : '+ trans.recipient + ' amount: ' + trans.amount );
                }
            }
        }
       // console.log(this.transactions);
    }

    viewDetails(transaction: Transaction){
        const navigationExtras: NavigationExtras = {
            queryParams: {
                special: JSON.stringify(transaction)
            }
        };
        this.router.navigate(['/detailtransaction'], navigationExtras);

    }
    onSearchChange(searchValue: string) {
        this.searchValue = searchValue;
        let result = [];
        console.log(searchValue);
        this.transactions.forEach(element => {
            if (
                element.recipient.includes(searchValue) ||
                element.sender.includes(searchValue)
            ) {
                result.push(element);
            }
        });
        this.searchResult = result;
    }



}
