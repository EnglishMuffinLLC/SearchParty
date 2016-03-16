//import {Page} from 'ionic-angular';
import {Page, Storage, LocalStorage} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {FORM_DIRECTIVES} from 'angular2/common';
import {JwtHelper} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth-service';
import 'rxjs/add/operator/map'; 


@Page({
  templateUrl: 'build/pages/users/log-in.html',
  directives: [FORM_DIRECTIVES]
})
export class LogIn {
LOGIN_URL: string = "/signin"; //update this later
SIGNUP_URL: string = "/signup";

  auth: AuthService;
  // When the page loads, we want the Login segment to be selected
  authType: string = "login";
  // We need to set the content type for the server
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});
  error: string;
  jwtHelper: JwtHelper = new JwtHelper();
  local: Storage = new Storage(LocalStorage);
  user: string;  

  constructor(private http: Http) {
    this.auth = AuthService;
    let token = this.local.get('id_token')._result;
    if(token) {
      this.user = this.jwtHelper.decodeToken(token).username;
    }
  }

  login(credentials) {
    navigator.geolocation.getCurrentPosition(position => {
      let send = {
        coords: "lat=" + position.coords.latitude + "&lng=" + position.coords.longitude,
        credentials: credentials 
      }
    this.http.post(this.LOGIN_URL, JSON.stringify(send), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => this.authSuccess(data.id_token),
        err => this.error = err
      );
  })
}    

  signup(credentials) {
    navigator.geolocation.getCurrentPosition(position => {
      let send = {
        coords: "lat=" + position.coords.latitude + "&lng=" + position.coords.longitude,
        credentials: credentials 
      }
    this.http.post(this.SIGNUP_URL, JSON.stringify(send), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => this.authSuccess(data.id_token),
        err => this.error = err
      );
    })  
  }

  logout() {
    this.local.remove('id_token');
    this.user = null;
  }

  authSuccess(token) {
    this.error = null;
    this.local.set('id_token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
  }

}