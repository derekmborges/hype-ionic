import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AddTransactionPage } from '../add-transaction/add-transaction';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  openAddTransaction() {
    const modal = this.modalCtrl.create(AddTransactionPage)
    modal.onDidDismiss(data => {
      console.log(data)
    })
    modal.present()
  }

}
