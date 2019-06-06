import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'blockchain', loadChildren: './blockchain/blockchain.module#BlockchainPageModule' },
  { path: 'signup', loadChildren: './sign-up/sign-up.module#SignUpPageModule' },
  { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsPageModule' },
  { path: 'detailtransaction', loadChildren: './detailtransaction/detailtransaction.module#DetailtransactionPageModule' },
  { path: 'detailblock', loadChildren: './detailblock/detailblock.module#DetailblockPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
