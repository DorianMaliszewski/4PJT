import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/login.service';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    myfooter: any;
    username: string;
    password: string;

  constructor( private loginService: LoginService,
               private socialAuthService: AuthService,
               private router: Router) {
  }

  ngOnInit() {

  }

    onSubmitForm() {
        this.loginService.login(this.username, this.password);
    }

    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                console.log(socialPlatform + ' sign in data : ' , userData);
                this.loginService.saveToken(userData.token, userData.name);
                this.router.navigate(['/home']);
            },
            err => console.log('erreur :' + err)
        );
    }



}
