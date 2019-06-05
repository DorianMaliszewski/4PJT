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
  searchResult = [];
  searchValue: string = "";
  displayedColumns: string[] = ["sender", "recipient", "value"];

  constructor(private blockchainService: BlockchainService) {}

  ngOnInit() {
    this.blockSubscription = this.blockchainService.blocksSubject.subscribe(
      (blocks: []) => {
        this.blocks = blocks;
      }
    );

    this.blockchainService.getBlockchain();
  }

  details(id: number) {
    window.open("/block-details/" + id, "_blank");
  }

  onSearchChange(searchValue: string) {
    this.searchValue = searchValue;
    var result = [];
    console.log(searchValue);
    this.blocks.forEach(element => {
      var hash: string = element.hash;
      if (hash.includes(searchValue)) {
        result.push(element);
      }
    });
    this.searchResult = result;
  }
}
