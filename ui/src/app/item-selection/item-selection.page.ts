import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-item-selection',
  templateUrl: './item-selection.page.html',
  styleUrls: ['./item-selection.page.scss'],
})
export class ItemSelectionPage implements OnInit {

  items = [
    'Nike Shox',
    'Air Jordans',
    'Adidas Pumas'
  ]

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  close() {
    this.modal.dismiss()
  }

  selectItem(item: any) {
    this.modal.dismiss({data: item})
  }

}
