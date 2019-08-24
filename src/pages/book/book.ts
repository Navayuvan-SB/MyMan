import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { MyOrderPage } from '../my-order/my-order';

/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
  check(){
    console.log('checkout clicked');
  }
}
