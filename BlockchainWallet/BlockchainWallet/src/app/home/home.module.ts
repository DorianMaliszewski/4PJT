import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {MyheaderComponent} from '../myheader/myheader.component';
import {BlockchainPage} from '../blockchain/blockchain.page';
import {BlockchainPageModule} from '../blockchain/blockchain.module';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
      RoundProgressModule
  ],
  declarations: [HomePage, MyheaderComponent],
})
export class HomePageModule {}
