import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {ConnectionBackend, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
  PROFILE_URL: string = '/userProfile'; //update this later
  contentHeader: Headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private _http:Http) {}

  getProfile(token) {
    console.log('called post req');
    let httpPostPromise = new Promise((resolve, reject) => {
      console.log('inside post promise');
      let dataToSend = { token: token };

      this._http.post(this.PROFILE_URL, JSON.stringify(dataToSend), {headers: this.contentHeader})
        .map(res => res.json())
        .subscribe(
          data => {
            console.log('data from promise: ', data);
            resolve(data);
          },
          err => {
            this.logError(err);
            reject(err);
          },
          () => console.log('data recieved')
          )
        })
    return httpPostPromise;
  }
  
  logError(err) {
    console.error('There was an error: ' + err);
  }
}  