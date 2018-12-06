import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class Authentication {
  private loggedIn = true

  constructor(public events: Events, private storage: Storage) {
  }

  isLoggedIn(): boolean {
    return this.loggedIn
  }

  login(email: string, pass: string): Promise<boolean> {
    console.log('attempting to log in...')
    console.log('credentials', email, pass)
    return this.verifyCredentials(email, pass).then(success => {
      if (success) {
        console.log('Successfully authenticated!')
        this.loggedIn = true
        setTimeout(() => this.events.publish('user:authChanged'), 3000)
        return true
      } else {
        console.log('Login FAILED')
        this.loggedIn = false
        return false
      }
    }).catch(err => { return false })
  }

  private verifyCredentials(email: string, pass: string): Promise<boolean> {
    return this.storage.get(email).then(value => {
      const userData = JSON.parse(value)
      console.log(`comparing '${pass}' to '${userData.password}'`)
      return userData.password === pass
    }).catch(err => {
      console.log(err)
      return false
    })
  }

  logout() {
    console.log('Logging out...')
    this.loggedIn = false
    this.events.publish('user:authChanged')
  }

}
