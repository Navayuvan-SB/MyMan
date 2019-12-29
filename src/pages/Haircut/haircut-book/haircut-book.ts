import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { HaircutPopupPage } from '../haircut-popup/haircut-popup';
/**
 * Generated class for the HaircutBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-haircut-book',
  templateUrl: 'haircut-book.html',
})
export class HaircutBookPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaircutBookPage');
  }

  popup(){
    const popover = this.popoverCtrl.create(HaircutPopupPage);
    popover.present();
  }

}
