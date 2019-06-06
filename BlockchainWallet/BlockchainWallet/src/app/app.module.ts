import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {LoginService} from './login/shared/login.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
//import { AgmCoreModule } from '@agm/core';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider, AuthService
} from 'angular-6-social-login';
import {MyheaderComponent} from './myheader/myheader.component';
import {FooterComponent} from './footer/footer.component';
import {FooterComponentModule} from './footer/footer.module';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {RoundProgressModule} from 'angular-svg-round-progressbar';



export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig([
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('683347582120369')
        },
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
                '823919646206-ut4kj1mg5mj0fhq5njgln321859ad6uv.apps.googleusercontent.com'
            )
        }
    ]);
    return config;
}

@NgModule({
  declarations: [
      AppComponent
  ],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FooterComponentModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
          positionClass: 'toast-bottom-full-width',
          preventDuplicates: true
      }),
      SocialLoginModule
      // AgmCoreModule.forRoot({
      //     apiKey: 'AIzaSyBMsv4kckvCcM19nEwl-jNf-T_xl2MgU8E'
      // })
  ],
  providers: [
    StatusBar,
    SplashScreen,
      LoginService,
      {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
