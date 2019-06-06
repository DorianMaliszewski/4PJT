import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/shared/login.service';
import {BlockchainService} from './shared/blockchain.service';
import {Subscription} from 'rxjs';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.page.html',
  styleUrls: ['./blockchain.page.scss'],
})
export class BlockchainPage implements OnInit {

    blocks: any[];
    blockchainSubscription: Subscription;
    searchResult = [];
    searchValue =  '';
  constructor(private loginService: LoginService,
              private blockchainService: BlockchainService,
              private router: Router) {




  }

  ngOnInit() {
      this.blockchainSubscription = this.blockchainService.blockchainSubject.subscribe(
          (blocks: any[]) => {
              this.blocks = blocks;
          }
      );
      this.blockchainService.getBlockchain();
  }

  getBlocks(){
      this.searchResult = [];
      this.searchValue = '';
      this.blockchainSubscription = this.blockchainService.blockchainSubject.subscribe(
          (blocks: any[]) => {
              this.blocks = blocks;
          }
      );
      this.blockchainService.getBlockchain();

  }

    onSearchChange(searchValue: string) {
        this.searchValue = searchValue;
        let result = [];
        console.log(searchValue);
        // console.log(this.blocks);
        this.blocks.forEach(element => {
                // console.log(element.hash);
            if (
                element.hash.includes(searchValue)
            ) {
                // console.log(element.hash);
                result.push(element);
            }
        });
        this.searchResult = result;
    }

    logout() {
        this.loginService.logout();
    }

    viewBlockDetails(block) {
      console.log('ok');
      const navigationExtras: NavigationExtras = {
            queryParams: {
                special: JSON.stringify(block)
            }
        };
        this.router.navigate(['/detailblock'], navigationExtras);
    }
}
