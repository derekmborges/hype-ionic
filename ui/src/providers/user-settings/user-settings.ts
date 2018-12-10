import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Theme } from '../../app/models/theme';

@Injectable()
export class UserSettings {
  private selectedTheme = Theme.Light

  constructor(public events: Events) { }

  setTheme(theme: Theme) {
    this.selectedTheme = theme
    this.events.publish('theme:changed')
    console.log('userSettings: theme changed to..', this.selectedTheme)
  }

  getActiveTheme(): Theme {
    return this.selectedTheme
  }

}
