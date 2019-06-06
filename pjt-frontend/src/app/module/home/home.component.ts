import { Component, OnInit } from "@angular/core";
import { Node, Edge, ClusterNode } from "@swimlane/ngx-graph";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BlockchainService } from "src/app/shared/blockchain.service";
import { Link } from "src/app/model/link.model";
import { Peer } from "src/app/model/peer.model";
import { Subscription } from "rxjs";

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
  peers: Peer[] = [];
  links: Link[] = [];
  peerSubscription: Subscription;
  linkSubscription: Subscription;

  // tslint:disable-next-line: variable-name
  constructor(
    private _formBuilder: FormBuilder,
    private blockchainService: BlockchainService
  ) {}

  ngOnInit() {
    this.peerSubscription = this.blockchainService.peersSubject.subscribe(
      (peers: []) => {
        this.peers = peers;
      }
    );

    this.linkSubscription = this.blockchainService.linksSubject.subscribe(
      (link: []) => {
        this.links = link;
      }
    );

    this.blockchainService.getPeers();

    console.log(this.peers);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
