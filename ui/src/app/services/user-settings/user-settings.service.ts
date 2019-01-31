import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { HttpService } from '../http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserSettings {
  constructor(public events: Events, private http: HttpService) { }

  getCurrentUser() {
    this.http.getWithAuth('users').then((data) => {
      console.log('user returned from api:')
      data.subscribe(response => {
        console.log(response)
      })
    })
  }

}
