import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';



/**
 * Generated class for the HaircutConformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-haircut-conformation',
  templateUrl: 'haircut-conformation.html',
})
export class HaircutConformationPage {

  // booking details
  bookedDetails: any;

  // No of seats
  numberOfSeats: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {

    // get the details from the source page
    this.bookedDetails = this.navParams.get('payload');

    // Updating the number of seats count
    if (this.bookedDetails.seats['first'] == 1 && this.bookedDetails.seats['second'] == 1) {
      this.numberOfSeats = 2;
    }
    else {
      this.numberOfSeats = 1;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaircutConformationPage');
  }

  // dismiss the view
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
