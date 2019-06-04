import { Component, OnInit } from "@angular/core";
import { BlockchainService } from "src/app/shared/blockchain.service";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-block",
  templateUrl: "./block.component.html",
  styleUrls: ["./block.component.scss"]
})
export class BlockComponent implements OnInit {
  blocks = [];
  transactions = [];
  blockSubscription: Subscription;
  transactionsBlock = [];

  displayedColumns: string[] = ["sender", "recipient", "value"];
  dataSource = new MatTableDataSource(this.transactionsBlock);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private blockchainService: BlockchainService) {}

  ngOnInit() {
    this.blockSubscription = this.blockchainService.blocksSubject.subscribe(
      (blocks: []) => {
        this.blocks = blocks;
      }
    );

    this.blockchainService.getBlockchain();
  }

  details(block: any) {
    //getTransactionByAddress(this.blocks[block.index])
  }

  getAllTransactions() {}
}
