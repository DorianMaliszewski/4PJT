import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-historique",
  templateUrl: "./historique.component.html",
  styleUrls: ["./historique.component.scss"]
})
export class HistoriqueComponent implements OnInit {
  transactions = [
    {
      sender: "davy",
      recipient: "ddaa",
      value: "erguqz55serfsre965srtgse6",
      signature: "653rtg6486qze36f65h"
    },
    {
      sender: "dacsvy",
      recipient: "ddaa",
      value: "erguqz55serfsre965srtgse6",
      signature: "653rtg6486qze36f65h"
    },
    {
      sender: "daqscvy",
      recipient: "ddaa",
      value: "erguqz55serfsre965srtgse6",
      signature: "653rtg6486qze36f65h"
    },
    {
      sender: "dqsavqsdcy",
      recipient: "ddaa",
      value: "erguqz55serfsre965srtgse6",
      signature: "653rtg6486qze36f65h"
    },
    {
      sender: "davdfvswvy",
      recipient: "ddaa",
      value: "erguqz55serfsre965srtgse6",
      signature: "653rtg6486qze36f65h"
    }
  ];

  displayedColumns: string[] = ["sender", "recipient", "value", "signature"];
  dataSource = new MatTableDataSource(this.transactions);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() {}

  ngOnInit() {}
}
