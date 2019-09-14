import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotographyPage } from '../photography/photography';
import { ProfilePage } from '../profile/profile';
import { MyOrderPage } from '../my-order/my-order';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  photography(){
    this.navCtrl.push(PhotographyPage);
  }
  clicked(){
    this.navCtrl.push(ProfilePage);
  }
  order(){
    this.navCtrl.push(MyOrderPage);
  }
}
