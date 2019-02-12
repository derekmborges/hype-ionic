import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {
  isSold = false
  transaction: Transaction

  constructor(private modal: ModalController) { }

  ngOnInit() {
    this.initializeTransaction()
  }

  close() {
    this.modal.dismiss()
  }

  initializeTransaction() {
    this.transaction = {
      itemId: '',
      purchaseDate: '',
      purchaseAmount: 0.00,
      saleDate: '',
      saleAmount: 0.00,
      itemState: 'in_inventory'
    }
  }

  toggleSold() {
    this.isSold = !this.isSold
    this.transaction.itemState = this.isSold ? 'sold' : 'in_inventory'
  }

  async save() {
    this.modal.dismiss(this.transaction)
  }

}

export interface Transaction {
  itemId: string,
  purchaseDate: string,
  purchaseAmount: number,
  saleDate: string,
  saleAmount: number,
  itemState: string
}
