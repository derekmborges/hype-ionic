import { Component } from '@angular/core';
import { NavController, NavParams, Events, LoadingController, ToastController } from 'ionic-angular';
import { Authentication } from '../../providers/authentication/authentication';
import { RegistrationPage } from '../registration/registration';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string
  password: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: Authentication,
    public events: Events,
    private loadingController: LoadingController,
    private toast: ToastController) {
  }

  login() {
    let loader = this.loadingController.create({
      content: 'Signing in...'
    })
    loader.present()
    this.auth.login(this.email, this.password).then(success => {
      if (success) {
        loader.dismiss()
      } else {
        loader.dismiss()
        let toast = this.toast.create({
          message: 'Login failed. Try again',
          duration: 3000,
          dismissOnPageChange: true
        })
        setTimeout(() => toast.present(), 1000)
      }
    })
  }

  goToSignUp() {
    this.navCtrl.push(RegistrationPage)
  }

}
