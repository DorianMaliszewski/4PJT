import { Component } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {ActivatedRoute, RouteConfigLoadEnd, Router} from '@angular/router';
import {LoginPage} from './login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  path: string;
  showTab: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
  ) {
    this.initializeApp();
    this.path = this.router.url;
    console.log('path : ' + this.path);
    this.showTab = 'hide-ion-tab-bar';
    this.router.events.subscribe((event) => {
        this.path = this.router.url;
        this.showTab = this.path.includes('/login') ? 'hide-ion-tab-bar' : '';
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


}
