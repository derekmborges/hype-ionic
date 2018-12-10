import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HypeApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage'
import { TabsPage } from '../pages/tabs/tabs';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { TransactionsPage } from '../pages/transactions/transactions';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { Authentication } from '../providers/authentication/authentication';
import { AddTransactionPage } from '../pages/add-transaction/add-transaction';
import { UserSettings } from '../providers/user-settings/user-settings';

@NgModule({
  declarations: [
    HypeApp,
    TabsPage,
    DashboardPage,
    TransactionsPage,
    AddTransactionPage,
    AnalyticsPage,
    AccountPage,
    LoginPage,
    RegistrationPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(HypeApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HypeApp,
    TabsPage,
    DashboardPage,
    TransactionsPage,
    AddTransactionPage,
    AnalyticsPage,
    AccountPage,
    LoginPage,
    RegistrationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Authentication,
    UserSettings
  ]
})
export class AppModule {}
