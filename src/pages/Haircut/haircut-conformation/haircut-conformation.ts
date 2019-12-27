import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { HaircutPopupPage } from '../haircut-popup/haircut-popup';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaircutConformationPage');
  }

  popup(){
    const popover = this.popoverCtrl.create(HaircutPopupPage);
    popover.present();
  }

}
