import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HaircutBookPage } from '../haircut-book/haircut-book';

/**
 * Generated class for the HaircutPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-haircut-popup',
  templateUrl: 'haircut-popup.html',
})
export class HaircutPopupPage {

  // Flags for color change in seat icons
  firstSeatFlag = 0;
  secondSeatFlag = 0;

  // timeSlot
  timeSlot: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.timeSlot = this.navParams.get('data');
    console.log(this.timeSlot);

    if (this.timeSlot.first == 1) {

      this.firstSeatFlag = 3;
      document.documentElement.style.setProperty(`--seat-color-first`, '#adadad');
    } else {

      this.firstSeatFlag = 0;
      document.documentElement.style.setProperty(`--seat-color-first`, '#808080');
    }

    if (this.timeSlot.second == 1) {

      this.secondSeatFlag = 3;
      document.documentElement.style.setProperty(`--seat-color-second`, '#adadad');
    } else {

      this.secondSeatFlag = 0;
      document.documentElement.style.setProperty(`--seat-color-second`, '#808080');
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaircutPopupPage');
  }

  // first seat
  firstSeat() {

    if (this.firstSeatFlag == 0) {

      document.documentElement.style.setProperty(`--seat-color-first`, '#35AE59');
      this.firstSeatFlag = 1;
    }
    else if (this.firstSeatFlag == 1) {

      document.documentElement.style.setProperty(`--seat-color-first`, '#808080');
      this.firstSeatFlag = 0;
    }
  }

  // second seat
  secondSeat() {
    if (this.secondSeatFlag == 0) {

      document.documentElement.style.setProperty(`--seat-color-second`, '#35AE59');
      this.secondSeatFlag = 1;
    }
    else if (this.secondSeatFlag == 1) {

      document.documentElement.style.setProperty(`--seat-color-second`, '#808080');
      this.secondSeatFlag = 0;
    }
  }

  // Cancel clicked
  cancelled() {

    this.viewCtrl.dismiss();
  }

  // Ok clicked
  conformed() {

    // Seat chosed update
    if (this.firstSeatFlag == 0 || this.firstSeatFlag == 1) {
      this.timeSlot.first = this.firstSeatFlag;
    }

    if (this.secondSeatFlag == 0 || this.secondSeatFlag == 1) {
      this.timeSlot.second = this.secondSeatFlag;
    }

    // Status update
    if ((this.firstSeatFlag == 1 && this.secondSeatFlag == 1) || (this.firstSeatFlag == 3 && this.secondSeatFlag == 3) || (this.firstSeatFlag == 1 && this.secondSeatFlag == 3) || this.firstSeatFlag == 3 && this.secondSeatFlag == 1) {
      this.timeSlot.status = 2;
    }
    else if (this.firstSeatFlag == 1 || this.secondSeatFlag == 1) {
      this.timeSlot.status = 1;
    }
    else {
      this.timeSlot.status = 0;
    }

    if (this.firstSeatFlag != 0 || this.secondSeatFlag != 0) {

      this.viewCtrl.dismiss(this.timeSlot);
    }
    else {
      this.viewCtrl.dismiss();
    }

  }

}
