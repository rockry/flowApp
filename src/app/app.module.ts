import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GraphPage } from '../pages/graph/graph';
import { dbService } from '../services/dbService/db.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Insomnia } from '@ionic-native/insomnia';
import { NativeAudio } from '@ionic-native/native-audio';
import { IonicStorageModule } from '@ionic/storage';
import {ChartsModule} from 'ng2-charts/charts/charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    GraphPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RoundProgressModule,
    IonicStorageModule.forRoot(),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    GraphPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    Insomnia,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    dbService
  ]
})
export class AppModule {}
