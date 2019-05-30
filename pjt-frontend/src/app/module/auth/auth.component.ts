import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { LoginService } from './shared/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private socialAuthService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    // on initialise le FormGroup
    this.loginForm = this.formBuilder.group(
      {
        // on renseigne les champs du formulaire
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  onSubmitForm() {
    const formValue = this.loginForm.value;
    this.loginService.login(formValue.username, formValue.password);
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == 'google') {
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
