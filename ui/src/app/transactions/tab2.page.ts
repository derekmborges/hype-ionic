import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddTransactionPage } from '../add-transaction/add-transaction.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private alert: AlertController, private modal: ModalController) {}

  async addTransaction() {
    const modal = await this.modal.create({
      component: AddTransactionPage
    })
    await modal.present()
    modal.onDidDismiss().then((returnedData: any) => {
      console.log('returned from add transaction: ', returnedData)
    })
  }

}
