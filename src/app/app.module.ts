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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage, 
    PhotographyPage,
    BookPage,
    MyOrderPage,
    OrderBookedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    OrderBookedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
