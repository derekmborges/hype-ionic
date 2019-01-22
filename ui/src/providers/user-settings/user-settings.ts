import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Theme } from '../../app/models/theme';
import { HttpService } from '../http-service/http-service';

@Injectable()
export class UserSettings {
  private selectedTheme = Theme.Light

  constructor(public events: Events, private http: HttpService) { }

  getCurrentUser() {
    this.http.get('users', (data: any) => {
      console.log('user returned from api:')
      console.log(data)
    })
  }

  setTheme(theme: Theme) {
    this.selectedTheme = theme
    this.events.publish('theme:changed')
    console.log('userSettings: theme changed to..', this.selectedTheme)
  }

  getActiveTheme(): Theme {
    return this.selectedTheme
  }

}
