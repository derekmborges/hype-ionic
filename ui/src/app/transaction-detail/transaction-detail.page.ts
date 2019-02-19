import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ItemSelectionPage } from '../item-selection/item-selection.page';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
})
export class TransactionDetailPage implements OnInit {
  isSold = false
  transaction: Transaction

  constructor(private modal: ModalController, private params: NavParams) {
    if (this.params.data && this.params.data.transaction) {
      this.transaction = this.params.data.transaction
      this.isSold = this.transaction.itemState === 'sold'
    }
  }

  ngOnInit() {
    if (!this.transaction)
      this.initializeNewTransaction()
  }

  close() {
    this.modal.dismiss()
  }

  initializeNewTransaction() {
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
