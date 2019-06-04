import { Component, OnInit } from "@angular/core";
import { BlockchainService } from "src/app/shared/blockchain.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-block",
  templateUrl: "./block.component.html",
  styleUrls: ["./block.component.scss"]
})
export class BlockComponent implements OnInit {
  blocks = [];
  transactions = [];
  blockSubscription: Subscription;

  constructor(private blockchainService: BlockchainService) {}

  ngOnInit() {
    this.blockSubscription = this.blockchainService.blocksSubject.subscribe(
      (blocks: []) => {
        this.blocks = blocks;
      }
    );

    this.blockchainService.getBlockchain();
  }

  getAllTransactions() {}
}
