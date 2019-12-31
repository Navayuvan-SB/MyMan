import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServices } from '../../../services/fireBaseService';
import { HaircutBookPage } from '../haircut-book/haircut-book';

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
    public fbService: FirebaseServices) {

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

}
