import { UserSettings } from './../../providers/user-settings/user-settings';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Authentication } from '../../providers/authentication/authentication';
import { Theme } from '../../app/models/theme';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  selectedTheme: Theme

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: Authentication,
    private loadingController: LoadingController,
    private userSettings: UserSettings) {
  }

  ionViewDidLoad() {
    this.selectedTheme = this.userSettings.getActiveTheme()
    console.log(this.selectedTheme.toString())
  }

  logout() {
    let loader = this.loadingController.create({
      content: 'Logging out...',
      dismissOnPageChange: true
    })
    loader.present()
    this.auth.logout()
  }

  changeTheme() {
    this.userSettings.setTheme(this.selectedTheme)
  }

}
