import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { User } from '../../app/models/user';
import { HttpService } from '../../providers/http-service/http-service';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  newUser: User = {
    firstName: 'derek',
    lastName: 'borges',
    email: 'db@gmail.com',
    password: 'hello'
  }
  confirmEmail: string = 'db@gmail.com'
  confirmPassword: string = 'hello'

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertController,
    private toast: ToastController,
    private http: HttpService) {
  }

  register() {
    console.log('Attempting to register user', this.newUser)
    
    if (this.validForm) {
      this.http.post('users', this.newUser)
        .subscribe(response => {
          const responseData = JSON.parse(response._body)
          console.log(responseData)
          if (responseData && responseData.ok) {
            this.alert.create({
              title: 'Success',
              subTitle: 'You are now registered!',
              buttons: [{text: 'OK'}]
            }).present()
          }
        }, (error) => {
          console.log(error)
          this.toast.create({
            message: 'Error registering new user. Try again',
          }).present()
      })
    } else {
      this.alert.create({subTitle: 'Email and password fields do not match.'}).present()
    }
    
  }

  get validForm(): boolean {
    return this.newUser.email === this.confirmEmail && this.newUser.password === this.confirmPassword
  }

}
