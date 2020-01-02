import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Orderbooked2Page } from '../orderbooked2/orderbooked2';
import { ProfilePage } from '../profile/profile';
import { FirebaseServices } from '../../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage {

  // seperated orders list
  photographyOrders: any = [];
  haircutOrders: any = [];

  // flags for user display
  haircutFlag : Boolean = false;
  photographyFlag : Boolean = false;

  // Raw Requests
  rawPhotographyOrders: any = [];
  rawHaircutOrders: any = [];

  // Expanded flags
  haircutExpanded: Boolean = false;
  photographyExpanded: Boolean = false;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fbService: FirebaseServices,
    public afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

    let user = this.afAuth.auth.currentUser;

    let loading = this.loadingCtrl.create({
      content: 'please wait'
    });

    loading.present();
    this.fbService.filterData(this.fbService.equalTo,
      'requests',
      null,
      this.fbService.orderByChild,
      'userId',
      user.uid)
      .then((response) => {
        loading.dismiss();
        let obj = Object.entries(response);

        // arrays for seperated services
        let haircut = Array();
        let photography = Array();

        obj.forEach(element => {

          // Check the service
          if (element[1]['service'] == 'Haircut') {
            haircut.push(element[1]);
          }
          else if (element[1]['service'] == 'Photography') {
            photography.push(element[1]);
          }

        });
        
        // Presence of haircut orders
        if (haircut.length == 0) {
          this.haircutFlag = true;
        }
        else {
          this.rawHaircutOrders = haircut;
        }

        // Presence if photography orders
        if (photography.length == 0) {
          this.photographyFlag = true;
        }
        else {
          this.rawPhotographyOrders = photography;
        }

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
        let details = Object.entries(response);
        let emailId = details[0][1];
        let phone = details[2][1];
        let fullName = details[1][1];

        let payload = {
          email: emailId,
          phoneNumber: phone,
          name: fullName
        }
        this.navCtrl.push(ProfilePage, { 'payload': payload });

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

}
