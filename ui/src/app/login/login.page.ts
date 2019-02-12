import { Component, OnInit } from '@angular/core';
import { LoadingController, Events, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpService } from '../services/http-service/http-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string
  password: string

  constructor(
    private loader: LoadingController,
    private router: Router,
    private http: HttpService,
    private events: Events,
    private toast: ToastController,
    private storage: Storage
    ) { }

  ngOnInit() {}

  login() {
    this.loader.create({
      message: 'Signing in...'
    }).then(loader => {
      loader.present()
      
      this.http.post('authentication/login', {email: this.email, password: this.password})
        .subscribe(response => {
          if (response && response.ok) {
            console.log('Successfully authenticated!')
            this.storage.set('authToken', response.data.token)
              .then(() => this.events.publish('user:authChanged'))
            loader.dismiss()
          } else if (response && response.error) {
            loader.dismiss()
            console.log('Error logging in: ', response.error)
            this.toast.create({
              message: response.error,
              duration: 3000,
              color: 'danger'
            }).then(it => it.present())
          } else {
            loader.dismiss()
            this.toast.create({
              message: 'Error logging in. Please try again later',
              duration: 3000,
              color: 'danger'
            }).then(it => it.present())
          }
        })

    })
  }

  goToSignUp() {
    this.router.navigate(['/signup'])
  }

}
