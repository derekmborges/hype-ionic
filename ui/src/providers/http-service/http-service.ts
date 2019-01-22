import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authentication } from '../authentication/authentication';

@Injectable()
export class HttpService {
  private apiUrl = 'http://localhost:4000/api/'

  constructor(private http: HttpClient, private auth: Authentication) {}

  get(endpoint: string, callback: any) {
    this.auth.getToken().then(token => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
      this.http.get(this.apiUrl + endpoint, { headers: headers }).subscribe(data => {
        callback(data)
      }, (error) => console.log(error))
    })
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(this.apiUrl + endpoint, body)
  }

}
