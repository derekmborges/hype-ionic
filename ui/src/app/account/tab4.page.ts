import { Component } from '@angular/core';
import { Authentication } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(private auth: Authentication) {}


  logout() {
    this.auth.logout()
  }

}
