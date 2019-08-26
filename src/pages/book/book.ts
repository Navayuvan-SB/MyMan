import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyOrderPage } from '../my-order/my-order';
import { OrderBookedPage } from '../order-booked/order-booked';

/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  value: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.value= navParams.get('item');
    console.log(this.value,'clicked');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }
  order(){
    this.navCtrl.push(MyOrderPage);
  }
  checkout(){
    this.navCtrl.push(OrderBookedPage);
  }
}
