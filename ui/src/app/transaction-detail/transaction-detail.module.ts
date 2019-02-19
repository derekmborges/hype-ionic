import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailPage } from './transaction-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransactionDetailPage],
  entryComponents: [TransactionDetailPage]
})
export class TransactionDetailPageModule {}
