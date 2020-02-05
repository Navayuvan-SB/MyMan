import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseServices } from '../../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ShopHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-shop-home',
  templateUrl: 'shop-home.html',
})
export class ShopHomePage {


  // meta data
  metaData : any = {
    status: false,
    offer: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private fbSercive: FirebaseServices, private afAuth: AngularFireAuth) {

    let user = this.afAuth.auth.currentUser;

    this.fbSercive.readOnce('haircut/shops/' + user.uid)
    .then((response) => {
      
      if (response['status'] == 0) {
        this.metaData['status'] = "false";
      }
      else if (response['status'] == 1) {
        this.metaData['status'] = "true";
      }
      this.metaData['offer'] = response['offers'];
    })
    .catch((error) => {
      
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopHomePage');
  }

}
