import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import{IonicStorageModule} from '@ionic/storage-angular'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import{ environment }from '../environments/environment';

import firebase from 'firebase/app';
firebase.initializeApp(environment.firebaseConfig)
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
