import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { MyOrderPage } from '../my-order/my-order';
import { OrderBookedPage } from '../order-booked/order-booked';
import { MyManService } from '../../services/myManService';

@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  
  source    : any;
  pack      : any;

  // selected function
  selectedFunction  : string = "";
  selectedItem      : any;
  fromTime          : string = "";
  toTime            : string = "";

  constructor(public navCtrl      : NavController, 
              public navParams    : NavParams,
              public alertCtrl    : AlertController,
              public modalCtrl    : ModalController,
              public mmnService   : MyManService) {
    
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



    // this.navCtrl.push(OrderBookedPage);
  }


  // function dropdown
  functionType(){

    let alert = this.alertCtrl.create();
    alert.setTitle('Functions');

    this.pack.function.forEach(element => {
      alert.addInput({
        type: 'radio',
        label: element.name,
        value: element,
        checked: false
      });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.selectedFunction = data.name;
        this.selectedItem     = data;
      }
    });
    alert.present();
  }

  //update EST
  updateEstimatedAmount(){
    // call amount estimation function
    
    if (this.fromTime != ""){
      this.mmnService.updateETA(this.fromTime, this.toTime, this.selectedItem)
                    .then((response) => {
                      console.log(response);
                    })
    }

  }

  // location clicked
  location(){
    console.log("Location clicked");
  }
}
