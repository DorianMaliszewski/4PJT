import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {LoginService} from '../login/shared/login.service';
import {map} from 'rxjs/operators';
import {AppComponent} from '../app.component';
import {Platform} from '@ionic/angular';


@Component({
  selector: 'app-myheader',
  templateUrl: './myheader.component.html',
  styleUrls: ['./myheader.component.scss'],
})
export class MyheaderComponent implements OnInit {

    name: string = JSON.parse(localStorage.getItem('currentUser')).name;

    constructor(
        private loginService: LoginService

    ) {

    }


    logout() {
        this.loginService.logout();
    }

    ngOnInit() {

    }

}
