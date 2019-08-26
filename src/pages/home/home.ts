import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotographyPage } from '../photography/photography';

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

}
