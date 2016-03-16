import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import { ConnectionBackend, HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
  constructor(private _http:Http) {}
  getData(){
    console.log("called get req")
    let httpGetPromise = new Promise((resolve, reject) => {
      console.log("called get req")
      this._http.get('/')
        .map(res => res.json())
        .subscribe(
          data => {
            console.log("data from promise: ", data)
            resolve(data)
          },
          err => reject(err),
          () => console.log('data recieved')
          )
        })
    return httpGetPromise
  }

  postData(data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log("called get req")
    let httpGetPromise = new Promise((resolve, reject) => {
      console.log("called get req")
      this._http.post('/', data, {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => {
            console.log("data from promise: ", data)
            resolve(data)
          },
          err => reject(err),
          () => console.log('data recieved')
          )
        })
    return httpGetPromise
  }
}  




// @Injectable()
// export class MyService {
//   constructor(private _http:Http) {}
//   getData(data) {
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded');
//     console.log("called post req")

//     let httpPromise = new Promise((resolve, reject) => {
//       console.log("inside promise")
//       this._http.post('/api', data, {headers: headers})
//         .map(res => res.json())
//         .subscribe(
//           data => {
//             console.log("data from promise: ", data)
//             resolve(data)
//           },
//           err => reject(err),
//           () => console.log('data recieved')  
//           )
//         })
    
//     return httpPromise
//   }
// }