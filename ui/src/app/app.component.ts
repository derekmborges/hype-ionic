import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { UserSettings } from './../providers/user-settings/user-settings';
import { Theme } from './models/theme';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class HypeApp {
  rootPage:any
  theme: Theme

  constructor(
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      private storage: Storage,
      private userSettings: UserSettings,
      events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault()
      splashScreen.hide()
      this.refreshRoot()
      this.refreshTheme()
      
      events.subscribe('user:authChanged', () => {
        this.refreshRoot()
      })
      events.subscribe('theme:changed', () => {
        this.refreshTheme()
      })
    });
  }

  refreshRoot() {
    this.isLoggedIn().then(isLoggedIn => {
      this.rootPage = isLoggedIn ? TabsPage : LoginPage
    })
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get('authToken').then(value => {
      console.log('authToken in storage: ', value)
      return value != null
    })
  }

  refreshTheme() {
    this.theme = this.userSettings.getActiveTheme()
  }
}
