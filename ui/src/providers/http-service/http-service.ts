import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {
  private apiUrl = 'http://localhost:4000/api/'

  constructor(private http: Http) {
  }

  get(endpoint: string, headers: any = {}): Observable<any> {
    return this.http.get(this.apiUrl + endpoint)
  }

  post(endpoint: string, body: any, headers: any = {}): Observable<any> {
    return this.http.post(this.apiUrl + endpoint, body)
  }

}
