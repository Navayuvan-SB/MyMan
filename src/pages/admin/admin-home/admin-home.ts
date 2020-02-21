import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FirebaseServices } from '../../../services/fireBaseService';
import { CallNumber } from '@ionic-native/call-number';
import { AdminEditPage } from '../admin-edit/admin-edit';
import { AdminNewPage } from '../admin-new/admin-new';

/**
 * Generated class for the AdminHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  // shop array
  shops: any;

  rawShops; any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public fbService: FirebaseServices,
    public call: CallNumber) {

    // Load the data 
    this.loadData();
  }

  // load the data from the database
  loadData() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });

    loading.present();

    this.shops = [];
    this.rawShops = [];

    this.fbService.readOnce('haircut/shops')
      .then((response) => {

        let obj = Object.entries(response);

        obj.forEach(element => {

          this.shops.push(element[1]);
          this.rawShops.push(element[1]);

        });

        loading.dismiss();
      })
      .catch((error) => {

        let toast = this.toastCtrl.create({
          message: 'Something is wrong, please try again later',
          position: 'bottom',
          duration: 4000
        });

        loading.dismiss();
        toast.present();

      });

  }

  // Restore the shops
  restoreShops() {

    this.shops = this.rawShops;
  }

  // Call the number
  callNumber(number) {

    this.call.callNumber(number, true);
  }

  // navigate to edit page
  navToEdit(shop) {

    this.navCtrl.push(AdminEditPage, { shop: shop });
  }

  // navigate to add page
  addShop() {

    this.navCtrl.setRoot(AdminNewPage);
  }

  // filtering the shops based on shop name
  getItems(ev: any) {

    // Reset items back to all of the items
    this.restoreShops();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.shops = this.shops.filter((item) => {
        return (item.city.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }

  }

}
