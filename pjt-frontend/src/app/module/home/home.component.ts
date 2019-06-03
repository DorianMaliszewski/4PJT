import { Component, OnInit } from "@angular/core";
import { Node, Edge, ClusterNode } from "@swimlane/ngx-graph";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BlockchainService } from "src/app/shared/blockchain.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  isLinear = false;
  transactionFormGroup: FormGroup;
  mapFormGroup: FormGroup;
  blockFormGroup: FormGroup;
  ipAddress: string;
  node = [];

  // tslint:disable-next-line: variable-name
  constructor(
    private _formBuilder: FormBuilder,
    private blockchainService: BlockchainService
  ) {}

  ngOnInit() {}

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
