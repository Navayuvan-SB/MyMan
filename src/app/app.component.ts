import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/Common/login/login';
import { PhotographyPage } from '../pages/Photography/photography/photography';
import { BookPage } from '../pages/Photography/book/book';
import { Orderbooked2Page } from '../pages/Common/orderbooked2/orderbooked2';
import { ProfilePage } from '../pages/Common/profile/profile';
import { SignupPage } from '../pages/Common/signup/signup';
import * as firebase from 'firebase/app';
import { HomePage } from '../pages/Common/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { HaircutHomePage } from '../pages/Haircut/haircut-home/haircut-home';
import { HaircutBookPage } from '../pages/Haircut/haircut-book/haircut-book';
import { HaircutConformationPage } from '../pages/Haircut/haircut-conformation/haircut-conformation';
import { HaircutPopupPage } from '../pages/Haircut/haircut-popup/haircut-popup';
import { OrderBookedPage } from '../pages/Photography/order-booked/order-booked';
import { ShopHomePage } from '../pages/Haircut-Shop/shop-home/shop-home';
import { ShopOrdersPage } from '../pages/Haircut-Shop/shop-orders/shop-orders';
import { ShopSettingsPage } from '../pages/Haircut-Shop/shop-settings/shop-settings';
import { AdminEditPage } from '../pages/admin/admin-edit/admin-edit';
import { AdminHomePage } from '../pages/admin/admin-home/admin-home';
import { AdminNewPage } from '../pages/admin/admin-new/admin-new';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any  = AdminEditPage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public angularFire: AngularFireAuth,
    public af: AngularFireModule,
    public alertCtrl: AlertController) {

    this.initialiseApp();

  }

  initialiseApp() {

    this.pages = [
      { title: '', component: '' },
      { title: 'Home', component: LoginPage },
    ];

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // check if the user is signed in

      // this.angularFire.authState.subscribe(user => {
      //   this.rootPage = user ? HomePage : LoginPage;
      // });


    });

    this.statusBar.styleBlackOpaque();
    this.splashScreen.hide();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }



  logout() {
    // logout the user and navigate to Login page

    let alert = this.alertCtrl.create({
      title: 'Oops..!',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.angularFire.auth.signOut();
            this.nav.setRoot(LoginPage);
          }
        },
        {
          text: 'No',
          handler: () => {
            //
          }
        }
      ]
    });

    alert.present();
  }
}
