import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
  
  source    : any;
  pack      : any;

  // selected function
  selectedFunction  : string = "";
  fromTime          : string = "";
  toTime            : string = "";

  constructor(public navCtrl      : NavController, 
              public navParams    : NavParams,
              public alertCtrl    : AlertController) {
    
    // get the value from source page
    this.source = navParams.get('payload');
    this.pack   = this.source.data;

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


  // function dropdown
  functionType(){

    let alert = this.alertCtrl.create();
    alert.setTitle('Functions');

    this.pack.function.forEach(element => {
      alert.addInput({
        type: 'radio',
        label: element.name,
        value: element.name,
        checked: false
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.selectedFunction = data;
      }
    });
    alert.present();
  }
}
