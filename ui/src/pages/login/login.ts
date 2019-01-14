import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, ToastController } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { HttpService } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = 'db2@gmail.com'
  password: string = 'hello12345'

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private loadingController: LoadingController,
    private toast: ToastController,
    private http: HttpService,
    private storage: Storage) {
  }

  login() {
    let loader = this.loadingController.create({
      content: 'Signing in...'
    })
    loader.present()
    console.log('attempting to log in...')
    console.log('credentials', this.email, this.password)

    this.http.post('authentication/login', {email: this.email, password: this.password})
      .subscribe((response) => {
        const data = JSON.parse(response._body)
        console.log(data)
        if (data && data.ok) {
          console.log('Successfully authenticated!')
          console.log('AuthToken: ', data.data.token)
          this.storage.set('authToken', data.data.token)
          setTimeout(() => this.events.publish('user:authChanged'), 3000)
          loader.dismiss()
        } else if (data && data.error) {
          loader.dismiss()
          console.log('Error logging in: ', data.error)
          this.toast.create({
            message: data.error,
            duration: 3000,
            dismissOnPageChange: true
          }).present()
        }
      })
  }

  goToSignUp() {
    this.navCtrl.push(RegistrationPage)
  }

}
