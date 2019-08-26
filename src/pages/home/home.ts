import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotographyPage } from '../photography/photography';
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

  navOrder(){
    this.navCtrl.push(MyOrderPage);
  }

}
