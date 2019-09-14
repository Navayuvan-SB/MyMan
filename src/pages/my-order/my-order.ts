import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Orderbooked2Page } from '../orderbooked2/orderbooked2';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the MyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrderPage');
  }
  clicked(){
    this.navCtrl.push(ProfilePage);
  }
  cardclick(){
    this.navCtrl.push(Orderbooked2Page);
  }

}
