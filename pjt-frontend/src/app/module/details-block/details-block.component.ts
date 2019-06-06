import { Component, OnInit } from "@angular/core";
import { Transaction } from "src/app/model/transaction.model";
import { Subscription } from "rxjs";
import { BlockchainService } from "src/app/shared/blockchain.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-details-block",
  templateUrl: "./details-block.component.html",
  styleUrls: ["./details-block.component.scss"]
})
export class DetailsBlockComponent implements OnInit {
  transactions = Array<Transaction>();
  addresses = [];
  blocks = [];
  blockSubscription: Subscription;
  idBlock: number;

  searchResult = [];
  searchValue: string = "";

  constructor(
    private blockchainService: BlockchainService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params["id"]);
      this.idBlock = params["id"];
    });

    this.blockSubscription = this.blockchainService.blocksSubject.subscribe(
      (blocks: any[]) => {
        this.blocks = blocks;
      }
    );

    this.blockchainService.getBlockchain();

    setTimeout(() => {
      // this.getAllAddress();
      this.getTransactions();
    }, 1000);
  }

  onSearchChange(searchValue: string) {
    this.searchValue = searchValue;
    var result = [];
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

  getTransactions() {
    //list des blocks
    // tslint:disable-next-line: prefer-for-of
    //list de data
    for (let j = 0; j < this.blocks[this.idBlock].data.length; j++) {
      // tslint:disable-next-line: prefer-for-of
      for (
        let h = 0;
        h < this.blocks[this.idBlock].data[j].txOuts.length;
        h++
      ) {
        const trans = new Transaction();

        if (this.blocks[this.idBlock].data[j].txIns[0].txOutId === "") {
          trans.sender = "recompense minage";
        } else {
          trans.sender = this.blocks[this.idBlock].data[j].txIns[0].txOutId;
        }

        trans.recipient = this.blocks[this.idBlock].data[j].txOuts[h].address;
        trans.montant = this.blocks[this.idBlock].data[j].txOuts[h].amount;
        this.transactions.push(trans);
      }
    }
  }
}
