import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  close() {
    this.modal.dismiss()
  }

  async save() {
    this.modal.dismiss({name: 'test-transaction'})
  }

}
