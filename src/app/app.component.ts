import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { PhotographyPage } from '../pages/photography/photography';
import { BookPage } from '../pages/book/book';
import { Orderbooked2Page } from '../pages/orderbooked2/orderbooked2';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import * as firebase from 'firebase/app';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;
  constructor(platform      : Platform, 
              statusBar     : StatusBar,
              splashScreen  : SplashScreen,
              angularFire   : AngularFireAuth,
              af            : AngularFireModule) { 
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // check if the user is signed in

      angularFire.authState.subscribe(user => {
        this.rootPage = user ? HomePage : LoginPage;
      });

      statusBar.styleBlackOpaque();
      splashScreen.hide();
    });
  }
}

