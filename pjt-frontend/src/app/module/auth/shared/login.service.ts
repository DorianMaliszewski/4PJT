import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public login(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Basic ' + btoa('Blockchain:admin')
    });

    const options = {
      headers
    };
    this.httpClient
      .post(environment.server_url + '/oauth/token', params.toString(), options)
      .subscribe(
        data => {
          this.saveToken(data, username);
          this.router.navigate(['/home']);
        },
        error => {
          this.toastr.error('Erreur', 'Login ou mot de passe incorrect');
        }
      );
  }

  saveToken(token, name) {
    console.log(token);
    localStorage.setItem('currentUser', JSON.stringify({ token, name }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth']);
  }
}
