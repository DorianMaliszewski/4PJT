import { Component, OnInit } from "@angular/core";
import { Node, Edge, ClusterNode } from "@swimlane/ngx-graph";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  mapFormGroup: FormGroup;
  entryDate: string;
  idBlock: number;
  ipAddress: string;
  balance: number;

  // tslint:disable-next-line: variable-name
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    /*=this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });*/
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
  }

  test(node) {
    this.entryDate = node.date;
    this.ipAddress = node.ipAddress;
    this.idBlock = node.idBlock;
    this.balance = node.balance;
  }
}
