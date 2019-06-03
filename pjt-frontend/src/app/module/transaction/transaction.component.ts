import { Component, OnInit } from "@angular/core";
import { BlockchainService } from "src/app/shared/blockchain.service";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"]
})
export class TransactionComponent implements OnInit {
  transactions = [];
  addresses = [];
  blocks = [];
  blockSubscription: Subscription;

  constructor(private blockchainService: BlockchainService) {}

  ngOnInit() {
    this.blockSubscription = this.blockchainService.blocksSubject.subscribe(
      (blocks: any[]) => {
        this.blocks = blocks;
      }
    );
    setTimeout(() => {
      this.getAllAddress();
    }, 2000);
  }

  async getAllAddress() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.blocks.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.blocks[i].data.length; j++) {
        // tslint:disable-next-line: prefer-for-of
        for (let h = 0; h < this.blocks[i].data[j].txOuts.length; h++) {
          if (
            !this.verifDoubleAddress(this.blocks[i].data[j].txOuts[h].address)
          ) {
            // this.addresses.push(this.blocks[i].data[j].txOuts[h].address);
            this.blockchainService
              .getResource(
                "api/address/" + this.blocks[i].data[j].txOuts[h].address
              )
              .toPromise()
              .then(
                response => {
                  console.log(response.unspentTxOuts);
                  for (let k = 0; k < response.unspentTxOuts.length; k++) {
                    response.unspentTxOuts[k].txOutsIndex = this.blocks[i].data[
                      j
                    ].txOuts[h].address;
                    this.transactions.push(response.unspentTxOuts[k]);
                  }
                },
                error => {
                  console.log(error);
                }
              );
          }
        }
      }
    }
  }

  // tslint:disable-next-line: ban-types
  verifDoubleAddress(address: string): Boolean {
    let find = false;
    this.addresses.forEach(element => {
      if (element === address) {
        find = true;
      }
    });
    return find;
  }
}
