import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Orderbooked2Page } from '../orderbooked2/orderbooked2';
import { ProfilePage } from '../profile/profile';
import { FirebaseServices } from '../../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage {

  // seperated orders list
  photographyOrders: any = [];
  haircutOrders: any = [];

  // flags for user display
  haircutFlag: Boolean = false;
  photographyFlag: Boolean = false;

  // Raw Requests
  rawPhotographyOrders: any = [];
  rawHaircutOrders: any = [];

  // Expanded flags
  haircutExpanded: Boolean = false;
  photographyExpanded: Boolean = false;

  // temp storage
  haircut: any = [];
  photography: any = [];

  loading: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fbService: FirebaseServices,
    public afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public call: CallNumber) {

    let user = this.afAuth.auth.currentUser;

    this.loading = this.loadingCtrl.create({
      content: 'please wait'
    });

    this.loading.present();

    this.haircut = [];
    this.photography = [];

    this.fbService.filterData(this.fbService.equalTo,
      'requests',
      null,
      this.fbService.orderByChild,
      'userId',
      user.uid)
      .then((response) => {
        let obj = Object.entries(response);

        // arrays for seperated services

        obj.forEach(element => {

          // Check the service
          if (element[1]['service'] == 'Haircut') {
            // element[1] = this.updateShopContact(element[1]);
            let uid = element[1]['shopId'];


            this.fbService.readOnce('haircut/shops/' + uid)
              .then((response) => {

                element[1]['shopContactNumber'] = response['contactNumber'];
                element[1]['coverImage'] = response['coverImage'];


              });
            this.haircut.push(element[1]);

          }
          else if (element[1]['service'] == 'Photography') {
            this.photography.push(element[1]);
          }

        });

        if (this.haircut.length == 0) {
          this.haircutFlag = true;
        }
        else {
          this.rawHaircutOrders = this.haircut;
        }

        // Presence if photography orders
        if (this.photography.length == 0) {
          this.photographyFlag = true;
        }
        else {
          this.rawPhotographyOrders = this.photography;
        }

        this.sortUsingDate();
        this.limitRequests();

      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrderPage');
  }

  // Nav to profile page
  clicked() {

    let toast = this.toastCtrl.create({
      duration: 2000,
      message: "Check your internet connection",
      position: 'bottom'
    });

    let user = this.afAuth.auth.currentUser;
    this.fbService.readOnce('users/' + user.uid)
      .then((response) => {

        this.navCtrl.push(ProfilePage, { 'payload': response });

      })
      .catch((error) => {
        toast.present();
      });
  }

  // Request clicked
  cardclick(item) {

    this.navCtrl.push(Orderbooked2Page, { 'payload': item });

  }

  // expand & shrink requests
  alterView(service, flag) {

    // check the service
    if (service == 'haircut') {
      this.haircutExpanded = flag
    }

    else if (service == 'photography') {
      this.photographyExpanded = flag;
    }

    this.limitRequests();

  }

  // Sort the requests by latest
  sortUsingDate() {


    this.rawHaircutOrders.sort((a, b) => {

      var rawADate = a.date.split('-');
      var aTime = a.time.split(' ');
      var aDate = new Date(rawADate[1] + ' ' + rawADate[0] + ' ' + rawADate[2] + ' ' + aTime[0] + ':00 ' + aTime[1]);

      var rawBDate = b.date.split('-');
      var bTime = b.time.split(' ');
      var bDate = new Date(rawBDate[1] + ' ' + rawBDate[0] + ' ' + rawBDate[2] + ' ' + bTime[0] + ':00 ' + bTime[1]); -1

      return (aDate > bDate ? -1 : 1);

    });

    this.loading.dismiss();

  }

  limitRequests() {

    // check the expanded flag and assign the array of requests
    if (this.haircutExpanded) {

      this.haircutOrders = this.rawHaircutOrders
    } else {

      this.haircutOrders = this.rawHaircutOrders.slice(0, 3);
    }

    if (this.photographyExpanded) {

      this.photographyOrders = this.rawPhotographyOrders;
    } else {

      this.photographyOrders = this.rawPhotographyOrders.slice(0, 3)
    }
  }

  // append contact number of shop
  updateShopContact(request) {

    return new Promise((resolve, reject) => {

      let uid = request['shopId'];

      this.fbService.readOnce('users/' + uid)
        .then((response) => {

          request['shopContactNumber'] = response['phoneNumber'];
          resolve(request);

        })
        .catch((error) => {
          reject(error);
        });

    });

  }

  // Call Shop
  callShop(number) {
    this.call.callNumber(number, true);
  }
}
