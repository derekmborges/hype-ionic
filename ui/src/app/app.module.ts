import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Authentication } from './services/authentication/authentication.service';
import { UserSettings } from './services/user-settings/user-settings.service';
import { HttpService } from './services/http-service/http-service.service';
import { IonicStorageModule } from '@ionic/storage'
import { HttpClientModule } from '@angular/common/http';
import { TransactionDetailPage } from './transaction-detail/transaction-detail.page';
import { TransactionDetailPageModule } from './transaction-detail/transaction-detail.module';
import { ItemSelectionPage } from './item-selection/item-selection.page';
import { ItemSelectionPageModule } from './item-selection/item-selection.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [TransactionDetailPage, ItemSelectionPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TransactionDetailPageModule,
    ItemSelectionPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Authentication,
    UserSettings,
    HttpService,
    Events
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
