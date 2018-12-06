import { Component } from '@angular/core';
import { DashboardPage } from '../dashboard/dashboard';
import { TransactionsPage } from '../transactions/transactions';
import { AnalyticsPage } from '../analytics/analytics';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = DashboardPage
  tab2Root: any = TransactionsPage
  tab3Root: any = AnalyticsPage
  tab4Root: any = AccountPage

  constructor() { }
  
}
