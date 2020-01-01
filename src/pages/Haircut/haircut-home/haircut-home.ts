import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseServices } from '../../../services/fireBaseService';
import { HaircutBookPage } from '../haircut-book/haircut-book';
import { ProfilePage } from '../../Common/profile/profile';
import { MyOrderPage } from '../../Common/my-order/my-order';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fbService: FirebaseServices,
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController) {

    // read the shops list from db
    this.fbService.readOnce('haircut/shops')
      .then((response) => {

        let obj = Object.entries(response);
        this.loadedShopArray = [];

        obj.forEach((shop) => {

          if (shop[1]['city'] == this.location) {
            this.loadedShopArray.push(shop[1]);
          }

        });

        this.initializeItems();

      })
      .catch((error) => {

      });



  }

  initializeItems() {
    this.shopArray = this.loadedShopArray;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaircutHomePage');
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
        return (item.shopName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
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


  // nav to my order page
  navToMyOrders() {
    this.navCtrl.push(MyOrderPage);
  }

}
