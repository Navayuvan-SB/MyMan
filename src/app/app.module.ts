import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/Common/home/home';
import { SignupPage } from '../pages/Common/signup/signup';
import { LoginPage } from '../pages/Common/login/login';
import { PhotographyPage } from '../pages/Photography/photography/photography';
import { BookPage } from '../pages/Photography/book/book';
import { MyOrderPage } from '../pages/Common/my-order/my-order';
import { OrderBookedPage } from '../pages/Photography/order-booked/order-booked';
import { Orderbooked2Page } from '../pages/Common/orderbooked2/orderbooked2';
import { ProfilePage } from '../pages/Common/profile/profile';
import { HaircutConformationPage } from '../pages/Haircut/haircut-conformation/haircut-conformation';
import { HaircutBookPage } from '../pages/Haircut/haircut-book/haircut-book';
import { HaircutHomePage } from '../pages/Haircut/haircut-home/haircut-home';
import { HaircutPopupPage } from '../pages/Haircut/haircut-popup/haircut-popup';
import { ShopHomePage } from '../pages/Haircut-Shop/shop-home/shop-home';
import { ShopOrdersPage } from '../pages/Haircut-Shop/shop-orders/shop-orders';
import { ShopSettingsPage } from '../pages/Haircut-Shop/shop-settings/shop-settings';
import { AdminEditPage } from '../pages/admin/admin-edit/admin-edit';
import { AdminHomePage } from '../pages/admin/admin-home/admin-home';
import { AdminNewPage } from '../pages/admin/admin-new/admin-new';

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

import { CallNumber } from '@ionic-native/call-number'




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
    ProfilePage,
    HaircutHomePage,
    HaircutBookPage,
    HaircutConformationPage,
    HaircutPopupPage,
    ShopHomePage,
    ShopOrdersPage,
    ShopSettingsPage,
    AdminEditPage,
    AdminHomePage,
    AdminNewPage
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
    ProfilePage,
    HaircutHomePage,
    HaircutBookPage,
    HaircutConformationPage,
    HaircutPopupPage,
    ShopHomePage,
    ShopOrdersPage,
    ShopSettingsPage,
    AdminEditPage,
    AdminHomePage,
    AdminNewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseServices,
    AngularFireAuth,
    AngularFireDatabase,
    MyManService,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
