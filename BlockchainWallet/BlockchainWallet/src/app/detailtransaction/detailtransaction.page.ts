import { Component, OnInit } from '@angular/core';
import {Transaction} from '../transactions/transaction';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-detailtransaction',
  templateUrl: './detailtransaction.page.html',
  styleUrls: ['./detailtransaction.page.scss'],
})
export class DetailtransactionPage implements OnInit {

  transaction: Transaction;
  block: any ;
  source = '';
    constructor(private route: ActivatedRoute, private router: Router) {
        this.route.queryParams.subscribe(params => {
            if (params && params.special) {
                this.transaction = JSON.parse(params.special);
                console.log(JSON.parse(params.special));
                if (params.source){
                    this.source = params.source;
                    this.block = JSON.parse(params.block);
                    //console.log(JSON.parse(params.block));
                }
            }

        });
    }

  ngOnInit() {
  }

  goToBlockDetails(){
      const navigationExtras: NavigationExtras = {
          queryParams: {
              special: JSON.stringify(this.block)
          }
      };
      this.router.navigate(['/detailblock'], navigationExtras);
    }

}
