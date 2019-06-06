import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {max} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  percent = 10;
  max = 100;
  numberItem = 50;
  constructor(private appcomponent: AppComponent) {
    appcomponent.path = 'home';


  }
  ngOnInit(){
  this.loadTransactionBar();
  }


  loadTransactionBar() {
    let i = 0 ;
      this.percent = 0;
      let myTimer = setInterval(() => {
        // console.log(i);
         if(i < this.numberItem){
             this.percent = this.percent + 1;
             i++;
         } else{
             clearInterval(myTimer);
         }
      }, 20);

  }


}
