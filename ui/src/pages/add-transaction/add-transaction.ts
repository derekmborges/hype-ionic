import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-transaction',
  templateUrl: 'add-transaction.html',
})
export class AddTransactionPage {
  itemSource: string
  purchaseDate: Date
  purchaseAmount: number
  canEditPurchase = false

  itemState: string
  isSold = false
  saleDate: Date
  saleAmount: number

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  close() {
    this.viewCtrl.dismiss()
  }

  save() {
    let data = {
      source: this.itemSource,
      purchaseData: this.purchaseDate,
      purchaseAmount: this.purchaseAmount,
      isSold: this.isSold,
      saleDate: this.saleDate,
      saleAmount: this.saleAmount
    }
    this.viewCtrl.dismiss(data)
  }

  itemSourceChanged() {
    this.canEditPurchase = this.itemSource && this.itemSource === 'purchased'
  }

  itemStateChanged() {
    this.isSold = this.itemState && this.itemState === 'sold'
  }

}
