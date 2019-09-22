import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyOrderPage } from '../my-order/my-order';
import { Orderbooked2Page } from '../orderbooked2/orderbooked2';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  order(){
    this.navCtrl.push(MyOrderPage);
  }
  cardclick(){
    this.navCtrl.push(Orderbooked2Page);
  }
  
}
