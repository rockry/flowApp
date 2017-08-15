import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App, ViewController} from "ionic-angular/index";
import { Insomnia } from '@ionic-native/insomnia';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
import { GraphPage } from '../pages/graph/graph';

@Component({
    templateUrl: 'app.html',
    providers: [HomePage]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    isAlwaysOn : Boolean;
    isAlarmSound : Boolean;
    rootPage: any = HomePage;
    
    pages: Array<{title: string, component: any}>;
    
    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private app:App, private insomnia: Insomnia, private storage: Storage, private homepage: HomePage) {
        this.initializeApp();
        
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Graph', component: GraphPage }
        ];
    }
    
    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
        this.platform.registerBackButtonAction(() => {
            let nav = this.app.getActiveNav();
            let activeView: ViewController = nav.getActive();
            
            if(activeView != null) {
                if(nav.canGoBack()) {
                    nav.pop();
                } else if(typeof activeView.instance.backButtonAction === 'function') {
                    activeView.instance.backButtonAction();
                } else {
                    nav.parent.select(0);
                }
            }
        });
        this.storage.get('isAlwaysOn').then((val) => {
            console.log('storage.get isAlwaysOn, ', val);
            this.isAlwaysOn = val || false;
            this.changeAlwaysOn(this.isAlwaysOn);
        }).catch(()=>{
            console.log('storage.get isAlwaysOn fail set default(true)');
            this.isAlwaysOn = true;
            this.changeAlwaysOn(this.isAlwaysOn);
        });
        this.storage.get('isAlarmSound').then((val) => {
            console.log('storage.get isAlarmSound, ', val);
            this.isAlarmSound = val || false;
            this.changeAlarmSound(this.isAlarmSound);
        }).catch(()=>{
            console.log('storage.get isAlarmSound fail set default(true)');
            this.isAlarmSound = true;
            this.changeAlarmSound(this.isAlarmSound);
        });
    }
    
    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
    
    openGraphPage() {
        this.homepage.addTodayDbdata();
        this.nav.push(GraphPage);
    }
    
    changeAlwaysOn(isAlwaysOn) {
        console.log("changeAlwaysOn, ", isAlwaysOn);
        this.storage.set('isAlwaysOn', isAlwaysOn);
        if(isAlwaysOn) {
            this.insomnia.keepAwake()
            .then(
                () => console.log('keepAwake success'),
                () => console.log('keepAwake error')
            );
        } else {
            this.insomnia.allowSleepAgain()
            .then(
                () => console.log('allowSleepAgain success'),
                () => console.log('allowSleepAgain error')
            );
        }
    }
    
    changeAlarmSound(isAlarmSound) {
        console.log("changeAlarmSound, ", isAlarmSound);
        this.storage.set('isAlarmSound', isAlarmSound);
        if(isAlarmSound) {
            this.rootPage.isAlarmSound = true;
        } else {
            this.rootPage.isAlarmSound = false;
        }
    }
}
