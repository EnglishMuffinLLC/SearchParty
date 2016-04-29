import {Page, Storage, LocalStorage, NavController, NavParams} from 'ionic-angular';
import {TemplatePage} from '../templates/templates';
import {FORM_DIRECTIVES} from 'angular2/common';
import {JwtHelper} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth-service';
import {APIService} from '../../services/api/api-service';

@Page({
  templateUrl: 'build/pages/users/log-in.html',
  directives: [FORM_DIRECTIVES]
})

export class LogIn {
  error: string;
  jwtHelper: JwtHelper = new JwtHelper();
  local: Storage = new Storage(LocalStorage);
  user: string;
  slides = [
    {
      title: "Welcome to Search Party!",
      description: "A modern scavenger hunt application. Never ask 'so what are we doing tonight?' again.",
      image: "img/searchpartylogoicon.png",
    },
    {
      title: "Go on a hunt!",
      description: "Have a blast while you complete tasks at different locations, and don't forget to upload pictures directly to your hunt!",
      image: "img/hunt.png",
    },
    {
      title: "Share your hunt!",
      description: "Use the generated url to share a live stream of the hunt, directly to twitter or to your favorite social media platform.",
      image: "img/share.png",
    }
  ];
  options: any;
  slider: any;

  constructor(
    private nav: NavController, 
    navParams: NavParams, 
    private _auth: AuthService
    ) {
    let token = this.local.get('id_token')._result;
    if(token) {
      this.user = this.jwtHelper.decodeToken(token).username;
    }
    this.options = {
      onlyExternal: false,
      onInit: (slides: any) => {
        this.slider = slides;    
      }
    }
  }
  
  skip() {
    this.slider.slideTo(3, 250);
  }

  getCoords(){
    navigator.geolocation.getCurrentPosition(position => {
        this.local.set('userLat', position.coords.latitude)
        this.local.set('userLng', position.coords.longitude)
      });
  }

  login(credentials) {
    this._auth.postData(credentials, 'signin')
      .then(data => {
        this.getCoords();
        this.loadTemplates();
        this.authSuccess(data.token);
        console.log('success');
      })
        .catch(error => {
          this.error = error;
          console.log(this.error);
        });
  }

  signup(credentials) {
    this._auth.postData(credentials, 'signup')
      .then(data => {
        this.getCoords();
        this.loadTemplates();
        this.authSuccess(data.token);
        console.log('success');
      })
        .catch(error => {
          this.error = error;
          console.log(this.error);
        });
  }

  logout() {
    this.local.remove('id_token');
    this.local.remove('userLat');
    this.local.remove('userLng');
    this.user = null;
  }

  authSuccess(token) {
    this.error = null;
    this.local.set('id_token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
    console.log(this.user);
  }

  loadTemplates() {
    this.nav.setRoot(TemplatePage)
  }

}
