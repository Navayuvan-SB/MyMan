import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-orderbooked2',
  templateUrl: 'orderbooked2.html',
})

export class Orderbooked2Page {

  item    : any;
  status  : any;

  constructor(public navCtrl      : NavController, 
              public navParams    : NavParams) {

                this.item = this.navParams.get('payload');
                console.log(this.item);
                this.status = this.item.status;

              } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad Orderbooked2Page');
  }

}
