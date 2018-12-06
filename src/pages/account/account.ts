import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Authentication } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: Authentication,
    private loadingController: LoadingController) {
  }

  logout() {
    let loader = this.loadingController.create({
      content: 'Logging out...',
      dismissOnPageChange: true
    })
    loader.present()
    this.auth.logout()

  }

}
