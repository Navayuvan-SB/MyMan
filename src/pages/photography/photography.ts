import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyOrderPage } from '../my-order/my-order';
import { BookPage } from '../book/book';

/**
 * Generated class for the PhotographyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-photography',
  templateUrl: 'photography.html',
})
export class PhotographyPage {
  card: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotographyPage');
  }
order(){
  this.navCtrl.push(MyOrderPage);
}
public card1click(){
  this.card= "pack1";
  this.navCtrl.push(BookPage,{ item:this.card });
 
}
card2click(){
  this.card= "pack2";
  this.navCtrl.push(BookPage,{ item:this.card });
 
}
card3click(){
  this.card= "pack3";
  this.navCtrl.push(BookPage, { item:this.card });
 
}
}