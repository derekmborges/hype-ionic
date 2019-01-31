import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authentication } from '../authentication/authentication.service';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:4000/api/'

  constructor(private http: HttpClient, private auth: Authentication) {}

  get(endpoint: string): Observable<any> {
      return this.http.get(this.apiUrl + endpoint)
  }

  getWithAuth(endpoint: string): Promise<Observable<any>> {
    return this.auth.getToken().then(token => {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
      return this.http.get(this.apiUrl + endpoint, {headers: headers})
    })
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(this.apiUrl + endpoint, body)
  }

  postWithAuth(endpoint: string, body: any): Promise<Subscription> {
    return this.auth.getToken().then(token => {
      const headers = new HttpHeaders().set('Authorization', 'Bearer' + token)
      return this.http.post(this.apiUrl + endpoint, body, {headers: headers})
        .subscribe(response => { return response })
    })
  }
}
