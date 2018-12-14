import { Transaction } from './../../app/models/transaction';
import { TransactionPage } from './../transaction/transaction';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  transactions: Transaction[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storage: Storage,
    private toast: ToastController) {
  }

  ionViewWillEnter() {
    this.refreshTransactions()
  }

  refreshTransactions() {
    this.transactions = []
    this.storage.keys().then(keys => {
      keys.forEach(key => {
        if (key.startsWith("Shoe")) {
          this.storage.get(key).then(value => {
            this.transactions.push(JSON.parse(value))
          })
        }
      })
    })
    console.log('refreshed list: ', this.transactions)
  }

  openTransaction(name: string) {
    console.log(`opening ${name}: `)
    const modal = this.modalCtrl.create(TransactionPage, {itemName: name})
    modal.onDidDismiss((t: Transaction) => {
      console.log('returning from update modal: ', t)
      if (t) {
        this.updateTransaction(t)
      }
    })
    modal.present()
  }

  updateTransaction(transaction: Transaction) {
    this.storage.set(transaction.itemName, JSON.stringify(transaction))
    .then(() => {
      this.toast.create({
        message: 'Transaction successfully updated',
        duration: 3000
      }).present()
      this.refreshTransactions()
    })
  }

  openAddTransaction() {
    const modal = this.modalCtrl.create(TransactionPage)
    modal.onDidDismiss(data => {
      console.log('returning from add modal: ', data)
      if (data) {
        this.addTransaction(data)
      }
    })
    modal.present()
  }

  addTransaction(data: any) {
    this.storage.set(data.itemName, JSON.stringify(data)).then(() => {
      this.refreshTransactions()
    })
    this.toast.create({
      message: 'Transaction successfully added',
      duration: 3000
    }).present()
  }

}
