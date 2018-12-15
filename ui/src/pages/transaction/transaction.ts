import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Transaction } from '../../app/models/transaction';

@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage {
  transaction: Transaction
  transactionExists = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private loading: LoadingController,
    private alert: AlertController,
    private toast: ToastController,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    if (this.navParams.data.itemName !== undefined) {
      this.retrieveTransaction(this.navParams.data.itemName)
    } else {
      this.initializeNewTransaction()
    }
  }

  initializeNewTransaction() {
    this.transaction = {
      itemName: '',
      itemSource: '',
      purchaseDate: undefined,
      purchaseAmount: undefined,
      itemState: '',
      saleDate: undefined,
      saleAmount: undefined
    }
  }

  retrieveTransaction(itemName: string) {
    console.log(`retrieving ${itemName}`)
    const loader = this.loading.create({
      content: 'Loading transaction...'
    })
    loader.present()
    this.storage.get(itemName).then(value => {
      if (value) {
        console.log('from storage: ', JSON.parse(value))
        this.transaction = JSON.parse(value)
      }
    })
    this.transactionExists = true
    loader.dismiss()
    console.log(this.transaction)
  }

  close() {
    this.viewCtrl.dismiss(null)
  }

  save() {
    this.viewCtrl.dismiss(this.transaction)
  }

  confirmDelete() {
    this.alert.create({
      message: 'Are you sure you want to delete this transaction?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteTransaction()
          }
        }
      ]
    }).present()
  }

  deleteTransaction() {
    this.storage.remove(this.transaction.itemName).then(() => {
      this.toast.create({
        message: 'Transaction deleted.',
        duration: 3000,
        dismissOnPageChange: false
      }).present()
      this.viewCtrl.dismiss(null)
    })
  }

  get canEditPurchase(): boolean {
    return this.transaction.itemSource && this.transaction.itemSource === 'purchased'
  }

  get canEditSale(): boolean {
    return this.transaction.itemState && this.transaction.itemState === 'sold'
  }

}
