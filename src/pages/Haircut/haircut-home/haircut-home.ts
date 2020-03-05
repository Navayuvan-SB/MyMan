import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FirebaseServices } from '../../../services/fireBaseService';
import { HaircutBookPage } from '../haircut-book/haircut-book';
import { ProfilePage } from '../../Common/profile/profile';
import { MyOrderPage } from '../../Common/my-order/my-order';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as $ from "jquery";

@Component({
  selector: 'page-haircut-home',
  templateUrl: 'haircut-home.html',
})
export class HaircutHomePage {


  // object array of shops
  shopArray: any = [];
  loadedShopArray: any;

  // location for filtering the shops
  location: any = "Dindigul";

  // shop flag
  shopFlag: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fbService: FirebaseServices,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    $('input.searchbar-input').attr('placeholder', 'Search Your City');

    this.shopFlag = false;

    let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });

    loading.present();

    // read the shops list from db
    this.afDatabase.database.ref('haircut/shops')
      .once("value", (response) => {

        let obj = Object.entries(response.val());
        this.loadedShopArray = [];

        obj.forEach((shop) => {

          this.loadedShopArray.push(shop[1]);
          this.shopFlag = true;

        });

        setTimeout(_ => {
          this.sortShop(this.loadedShopArray)
            .then((response) => {
              this.loadedShopArray = response;
            })
        }, 200)


        this.initializeItems();
        loading.dismiss();

      })


  }

  ionViewDidLoad() {
    $('input.searchbar-input').attr('placeholder', 'Search Your City');
  }

  initializeItems() {
    this.shopArray = this.loadedShopArray;
  }

  // filtering the shops based on shop name
  getItems(ev: any) {

    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.shopArray = this.shopArray.filter((item) => {
        return (item.city.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

      if (this.shopArray.length != 0) {
        this.shopFlag = true;
      }
      else {
        this.shopFlag = false;
      }

    }

    if (this.shopArray.length != 0) {
      this.shopFlag = true;
    }
    else {
      this.shopFlag = false;
    }

  }

  // nav to selected shop
  shopSelected(shop) {

    let payload = {
      source: 'haircut-home',
      data: shop
    }

    this.navCtrl.push(HaircutBookPage, payload);

  }

  // nav to profile
  navToProfile() {
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


  // nav to my order page
  navToMyOrders() {
    this.navCtrl.push(MyOrderPage);
  }

  // Sort based on time
  sortShop(arr) {

    return new Promise((resolve) => {

      function compare(a, b) {


        if (Number(a.status) < Number(b.status)) {
          return 1;
        }
        if (Number(a.status) > Number(b.status)) {
          return -1;
        }
        return 0;
      }

      arr.sort(compare);

      resolve(arr);

    })

  }

}
