import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class Authentication {

  constructor(public events: Events, private storage: Storage) {
  }

  logout() {
    console.log('Logging out...')
    this.events.publish('user:authChanged')
  }

}
