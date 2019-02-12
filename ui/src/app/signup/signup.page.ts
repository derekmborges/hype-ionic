import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service/http-service.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  firstName: string
  lastName: string
  email: string
  confirmEmail: string
  password: string
  confirmPassword: string

  constructor(private http: HttpService, private toast: ToastController, private alert: AlertController) { }

  ngOnInit() {}

  signup() {
    if (this.isValidForm) {
      const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }

      this.http.post('users', newUser)
        .subscribe(responseData => {
          if (responseData && responseData.ok) {
            this.alert.create({
              message: 'Success!',
              subHeader: 'You are now registered!',
              buttons: [{text: 'Ok'}]
            }).then(it => it.present())
          }
        }, () => {
          this.toast.create({
            message: 'Error registering new user. Try again',
            color: 'danger'
          }).then(it => it.present())
      })
    } else {
      this.alert.create({
        message: 'Email and password fields do not match.',
        buttons: [{text: 'Ok'}]
      }).then(it => it.present())
    }
  }

  get isValidForm(): boolean {
    return this.email && this.password &&
      this.email === this.confirmEmail && this.password === this.confirmPassword
  }

}
