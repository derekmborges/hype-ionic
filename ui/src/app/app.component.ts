import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Authentication } from './services/authentication/authentication.service';
import { UserSettings } from './services/user-settings/user-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private auth: Authentication,
    private userSettings: UserSettings,
    private events: Events
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then((readySource) => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()
      this.checkLoggedIn()

      this.events.subscribe('user:authChanged', () => {
        this.checkLoggedIn()
      })

    });
  }

  checkLoggedIn() {
    this.auth.isLoggedIn().then((isLoggedIn: Boolean) => {
      if (isLoggedIn) {
        this.userSettings.getCurrentUser()
        this.router.navigate(['/'])
      }
      else {
        try {
          this.router.navigate(['/login'])
        } catch (error) {
          console.log('error navigating to login', error)
        }
      }
    })
  }
}
