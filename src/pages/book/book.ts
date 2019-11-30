import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { MyOrderPage } from '../my-order/my-order';
import { OrderBookedPage } from '../order-booked/order-booked';
import { MyManService } from '../../services/myManService';
import { FirebaseServices } from '../../services/fireBaseService';

@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  
  source    : any;
  pack      : any;
  functions : any;

  // input fields
  selectedFunction  : string = "";
  fromTime          : string = "";
  toTime            : string = "";
  locationBooked    : string = "";

  // Estimated amount
  estimatedAmount   : number = 0;

  // instance for loading and toast
  loading           : any;
  toast             : any;

  // status flag for checkout
  checkoutSatus     : boolean = false;

  constructor(public navCtrl      : NavController, 
              public navParams    : NavParams,
              public alertCtrl    : AlertController,
              public modalCtrl    : ModalController,
              public mmnService   : MyManService,
              public fbService    : FirebaseServices,
              public loadingCtrl  : LoadingController,
              public toastCtrl    : ToastController) {

    // loading instance
    this.loading = this.loadingCtrl.create({
      content: 'please wait'
    });


    // toast instance
    this.toast = this.toastCtrl.create({
      duration  : 2500,
      position  : 'bottom'
    });

    
    // get the value from source page
    this.source = navParams.get('payload');
    this.pack   = this.source.data;

    
    // get the functions details
    this.fbService.readOnce('functions')
                  .then((response) => {

                    this.functions = response;
                    
                  })
                  .catch((error) => {

                    // handle error
                    this.toast.setMessage("Network connection error..!");
                    this.toast.present();
                  })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }
  order(){
    this.navCtrl.push(MyOrderPage);
  }

  // checkout method
  checkout(){

    if (this.checkoutSatus){

        let payload = {
          pack      : this.pack,
          cost      : this.estimatedAmount,
          fromDate  : this.fromTime,
          toDate    : this.toTime,
          function  : this.selectedFunction,
          location  : this.locationBooked,
          status    : 0
        }
    
        this.navCtrl.push(OrderBookedPage, { payload: payload });
    }
    else{
      this.toast.setMessage("Choose the fields correctly..!");
      this.toast.present();
    }
    
  }


  // function dropdown
  functionType(){

    let alert = this.alertCtrl.create();
    alert.setTitle('Functions');

    this.functions.forEach(element => {
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

  //update EST
  updateEstimatedAmount(){

    // call amount estimation function
    if (this.fromTime != "" && this.toTime != "" && this.selectedFunction != ""){

      this.checkoutSatus = true;
      this.mmnService.updateETA(this.fromTime, this.toTime, this.pack)
                    .then((response) => {

                      this.estimatedAmount = Number(response);

                    })
                    .catch((error) => {

                      this.estimatedAmount = Number(error);
                      this.toast.setMessage("From and To date incorrect");
                      this.toast.present();

                    });

    }
    else{
      this.checkoutSatus = false;
    }

  }

  // location clicked
  location(){
    console.log("Location clicked");
  }
}
