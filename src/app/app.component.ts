import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController, ToastController } from 'ionic-angular';
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
import { FirebaseServices } from '../services/fireBaseService';
import { AngularFireDatabase } from 'angularfire2/database';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { MyOrderPage } from '../pages/Common/my-order/my-order';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { timer } from 'rxjs/observable/timer';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{ title: string, component: any, icon: String }>;

  userName: any = '';

  notificationPage: any;

  showSplash = true;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public angularFire: AngularFireAuth,
    public af: AngularFireModule,
    public alertCtrl: AlertController,
    public fbService: FirebaseServices,
    public afData: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public localNotifications: LocalNotifications,
    public toastCtrl: ToastController,
    public push: Push,
    public inAppBrowser: InAppBrowser) {

    this.initialiseApp();

  }

  initialiseApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // check if the user is signed in

      this.angularFire.authState.subscribe(user => {
        if (user) {

          this.fbService.readOnce('users/' + user['uid'])
            .then((response) => {

              // Get the refresh token to send push notifications
              const options: PushOptions = {
                android: {
                  senderID: '60171985623'
                },
                ios: {
                  alert: 'true',
                  badge: true,
                  sound: 'false'
                }
              }

              const pushObject: PushObject = this.push.init(options);

              pushObject.on('registration').subscribe((registration: any) => {
                this.fbService.writeInDatabase('users/' + user['uid'] + '/refreshToken', registration);
              });

              // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

              this.userName = response['name'];

              // Redirect according the user type
              if (response['type'] == 'user') {

                this.pages = [
                  { title: '', component: '', icon: '' },
                  { title: 'Home', component: HomePage, icon: 'home' },
                  { title: 'Privacy Policy', component: 'Privacy Policy', icon: 'lock' }
                ];

                this.rootPage = HomePage;
                this.notificationPage = MyOrderPage;
                this.afData.database.ref('requests').off();
                timer(3000).subscribe(() => { this.showSplash = false });
              }
              else if (response['type'] == 'shop') {

                this.pages = [
                  { title: '', component: '', icon: '' },
                  { title: 'Home', component: ShopHomePage, icon: 'home' },
                  { title: 'Order Page', component: ShopOrdersPage, icon: 'cart' },
                  { title: 'Settings', component: ShopSettingsPage, icon: 'settings' },
                  { title: 'Privacy Policy', component: 'Privacy Policy', icon: 'lock' }
                ];

                this.rootPage = ShopHomePage;
                this.notificationPage = ShopOrdersPage;
                this.afData.database.ref('requests').off();
                timer(3000).subscribe(() => { this.showSplash = false });
              }
              else if (response['type'] == 'admin') {

                this.pages = [
                  { title: '', component: '', icon: '' },
                  { title: 'Home', component: AdminHomePage, icon: 'home' },
                  { title: 'New Shop', component: AdminNewPage, icon: 'person-add' },
                  { title: 'Privacy Policy', component: 'Privacy Policy', icon: 'lock' }
                ];

                this.rootPage = AdminHomePage;
                timer(3000).subscribe(() => { this.showSplash = false });
              }

            })
            .catch((error) => {
              timer(3000).subscribe(() => { this.showSplash = false });
            });

        }
        else { // If not logged in
          this.rootPage = LoginPage;
          timer(3000).subscribe(() => { this.showSplash = false });
        }
      })



      if (this.platform.is('cordova')) {
        // You are on a device, cordova plugins are accessible
        let notificaiton = this.localNotifications.on('click');

        notificaiton.subscribe((resp) => {

          if (this.notificationPage == ShopHomePage) {

            let element = resp.data.mydata;
            let path = 'requests/' + element['appointmentId'];
            element['shopNotification'] = 1;

            let data = {
              [path]: element
            };

            this.fbService.updateField(data);
          }
          else if (this.notificationPage == HomePage) {

            let element = resp.data.mydata;
            let path = 'requests/' + element['appointmentId'];
            element['userNotification'] = 1;
            let data = {
              [path]: element
            };

            this.fbService.updateField(data);

          }

          this.nav.push(this.notificationPage);

        });

      } else {
        // Cordova not accessible, add mock data if necessary
      }

      this.splashScreen.hide();
      this.pushSetup();

    });

  }

  pushSetup() {

    const options: PushOptions = {
      android: {
        senderID: '60171985623'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    }

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => {

      this.localNotifications.schedule({
        id: Date.now(),
        title: 'New Appointment',
        text: 'You have a new Appointment',
        data: { mydata: notification.data.request }
      });

      console.log(notification);
    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if (page.component == 'Privacy Policy') {
      let ref = this.inAppBrowser.create('https://sites.google.com/view/myman-app/privacy-policy', '_self', { location: 'no' });
    }
    else  {
      this.nav.setRoot(page.component);
    }
    
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
