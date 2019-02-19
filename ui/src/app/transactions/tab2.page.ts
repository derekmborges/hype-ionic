import { Component } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TransactionDetailPage } from '../transaction-detail/transaction-detail.page';
import { HttpService } from '../services/http-service/http-service.service';
import { ItemSelectionPage } from '../item-selection/item-selection.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  allTransactions: any[]
  soldTransactions: any[]
  inventoryTransactions: any[]

  constructor(
    private alert: AlertController,
    private toast: ToastController,
    private modal: ModalController,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.refreshTransactions()
  }

  refreshTransactions() {
    this.http.getWithAuth('transactions').then((data) => {
      data.subscribe(response => {
        this.allTransactions = response.data
        this.soldTransactions = this.allTransactions.filter(t => t.itemState === 'sold')
        this.inventoryTransactions = this.allTransactions.filter(t => t.itemState === 'in_inventory')
      }, error => {
        console.log('error retrieving transactions:')
        console.log(error)
      })
    })
  }

  async addTransaction() {
    const modal = await this.modal.create({
      component: TransactionDetailPage
    })
    await modal.present()
    modal.onDidDismiss().then((returnedData: any) => {
      if (returnedData.data) {
        this.saveTransaction(returnedData.data)
      }
    })
  }

  // Not used yet
  async openTransaction(transaction: any) {
    const modal = await this.modal.create({
      component: TransactionDetailPage,
      componentProps: {transaction: transaction}
    })
    await modal.present()
    modal.onDidDismiss().then((returnedData: any) => {
      if (returnedData.data) {
        this.saveTransaction(returnedData.data)
      }
    })
  }

  saveTransaction(transaction: any) {
    this.http.postWithAuth('transactions', transaction).then((data) => {
      data.subscribe(response => {
        if (response && response.ok) {
          this.toast.create({
            message: 'Transaction saved successfully',
            color: 'success',
            duration: 5000
          }).then(it => it.present())
          this.refreshTransactions()
        }
      }, error => {
        console.log('error adding transaction: ')
        console.log(error)
        this.alert.create({
          subHeader: error.states,
          message: error.message,
          buttons: [{text: 'Ok'}]
        }).then(it => it.present())
      })
    })
  }

}
