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
      data.subscribe(response => {
        console.log('current user: ', response.data.user)
      })
    })
  }

}
