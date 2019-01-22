import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class Authentication {

  constructor(public events: Events, private storage: Storage) {
  }

  getToken(): Promise<string> {
    return this.storage.get('authToken')
  }

  logout() {
    console.log('Logging out...')
    this.storage.remove('authToken').then(() => {
      this.events.publish('user:authChanged')
    })
  }

}
