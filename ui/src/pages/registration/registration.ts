import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../app/models/user';
import { Theme } from '../../app/models/theme';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  newUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    theme: Theme.Light.toString()
  }
  confirmEmail: string
  confirmPassword: string

  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private alert: AlertController) {
  }

  register() {
    console.log('Attempting to register user', this.newUser)
    
    if (this.newUser.email === this.confirmEmail && this.newUser.password === this.confirmPassword) {
      this.storage.get(this.newUser.email).then(value => {
        if (!value) {
          this.storage.set(this.newUser.email, JSON.stringify(this.newUser))
          this.alert.create({subTitle: 'You are now registered!'}).present()
        } else {
          this.alert.create({subTitle: 'The email you entered already exists.'}).present()
        }
      })
    } else {
      this.alert.create({subTitle: 'Email and password fields do not match.'}).present()
    }
    
  }

}
