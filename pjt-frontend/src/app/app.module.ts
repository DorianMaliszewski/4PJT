import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./module/home/home.component";
import { AuthComponent } from "./module/auth/auth.component";
import { MapComponent } from "./module/map/map.component";
import { HistoriqueComponent } from "./module/historique/historique.component";
import { MenuComponent } from "./core/menu/menu.component";
import { LayoutModule } from "@angular/cdk/layout";
// tslint:disable-next-line: max-line-length
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatTableModule,
  MatStepperModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { AgmCoreModule } from "@agm/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angular-6-social-login";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { BlockComponent } from './module/block/block.component';
import { TransactionComponent } from './module/transaction/transaction.component';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("328420117805195")
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        "823919646206-ut4kj1mg5mj0fhq5njgln321859ad6uv.apps.googleusercontent.com"
      )
    }
  ]);
  return config;
}

const appRoutes: Routes = [
  {
    path: "",
    component: AuthComponent
  },
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "historique",
    component: HistoriqueComponent
  },
  {
    path: "map",
    component: MapComponent
  },
  {
    path: "not-found",
    component: NotFoundComponent
  },
  {
    path: "**",
    redirectTo: "not-found"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    MapComponent,
    HistoriqueComponent,
    MenuComponent,
    NotFoundComponent,
    BlockComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    MatStepperModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-full-width",
      preventDuplicates: true
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBMsv4kckvCcM19nEwl-jNf-T_xl2MgU8E"
    }),
    SocialLoginModule,
    RouterModule.forRoot(appRoutes),
    NgxGraphModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
