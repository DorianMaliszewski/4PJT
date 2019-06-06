import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Transaction} from '../transactions/transaction';

@Component({
  selector: 'app-detailblock',
  templateUrl: './detailblock.page.html',
  styleUrls: ['./detailblock.page.scss'],
})
export class DetailblockPage implements OnInit {
    block = [];
    transactions: Transaction[];
    searchResult = [];
    searchValue =  '';
    constructor(private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            if (params && params.special) {
                this.block = JSON.parse(params.special);
                console.log('detailsBlocks :' + JSON.parse(params.special));
                this.getTransactionByBlock();
            }
        });

    }

  ngOnInit() {
  }

  getTransactionByBlock(){
          this.searchResult = [];
          this.searchValue = '';
          this.transactions = Array<Transaction>();
          // list des blocks
              // list de data
              for (let j = 0; j < this.block.data.length; j++) {
                  for (let h = 0; h < this.block.data[j].txOuts.length; h++) {
                      let trans = new Transaction();
                      if (this.block.data[j].txIns[0].txOutId === '') {
                          trans.sender = 'recompense';
                      } else {
                          trans.sender = this.block.data[j].txIns[0].txOutId;
                      }

                      trans.recipient = this.block.data[j].txOuts[h].address;
                      trans.amount = this.block.data[j].txOuts[h].amount;
                      //console.log(trans);
                      this.transactions.push(trans);
                      // console.log('transaction : sender' + trans.sender + ' recipient : '+ trans.recipient + ' amount: ' + trans.amount );
                  }
              }
          }

    viewDetails(transaction: Transaction){
        const navigationExtras: NavigationExtras = {
            queryParams: {
                special: JSON.stringify(transaction),
                source: 'blockTransactionDetails',
                block: JSON.stringify(this.block)
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
