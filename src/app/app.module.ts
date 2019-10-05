import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { PhotographyPage } from '../pages/photography/photography';
import { BookPage } from '../pages/book/book';
import { MyOrderPage } from '../pages/my-order/my-order';
import { OrderBookedPage } from '../pages/order-booked/order-booked';
import { Orderbooked2Page } from '../pages/orderbooked2/orderbooked2';
import { ProfilePage } from '../pages/profile/profile';

// Firebase Services
import { FirebaseServices } from '../services/fireBaseService';


// Angularfire2 for firebase functions
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

// firebase credentials
import { firebaseConfig } from '../credentials/firebase-credential'

// myman service
import { MyManService } from '../services/myManService';

import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage, 
    PhotographyPage,
    BookPage,
    MyOrderPage,
    OrderBookedPage,
    Orderbooked2Page,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    PhotographyPage,
    BookPage,
    MyOrderPage,
    OrderBookedPage,
    Orderbooked2Page,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseServices,
    AngularFireAuth,
    AngularFireDatabase,
    MyManService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
