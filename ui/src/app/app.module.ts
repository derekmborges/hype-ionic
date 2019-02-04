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
import { AddTransactionPage } from './add-transaction/add-transaction.page';
import { AddTransactionPageModule } from './add-transaction/add-transaction.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AddTransactionPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AddTransactionPageModule
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
