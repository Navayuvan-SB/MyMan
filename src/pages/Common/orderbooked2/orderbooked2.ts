import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseServices } from '../../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-orderbooked2',
  templateUrl: 'orderbooked2.html',
})

export class Orderbooked2Page {

  item: any;
  status: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public call: CallNumber) {

    this.item = this.navParams.get('payload');
    console.log(this.item);
    this.status = this.item.status;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Orderbooked2Page');
  }

  // Call Shop
  callShop(number) {
    this.call.callNumber(number, true);
  }

}
