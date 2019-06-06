import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BlockchainPage } from './blockchain.page';
import {MyheaderComponent} from '../myheader/myheader.component';
import {FooterComponent} from '../footer/footer.component';
import {FooterComponentModule} from '../footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: BlockchainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //  FooterComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BlockchainPage],
})
export class BlockchainPageModule {}
