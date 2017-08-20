import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';

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

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    ChartsModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
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
