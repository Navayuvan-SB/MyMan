import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Orderbooked2Page } from '../orderbooked2/orderbooked2';
import { ProfilePage } from '../profile/profile';
import { FirebaseServices } from '../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage {

  requests : any;

  constructor(public navCtrl    : NavController, 
              public navParams  : NavParams,
              public fbService  : FirebaseServices,
              public fbAuth     : AngularFireAuth) {

                let user = this.fbAuth.auth.currentUser;

                this.fbService.filterData(this.fbService.equalTo,
                                          'requests',
                                          null,
                                          this.fbService.orderByChild,
                                          'userId',
                                          user.email)
                              .then((response) => {
                                let obj = Object.entries(response.val());
                                let arr = Array();
                                obj.forEach(element => {
                                  arr.push(element[1]);
                                });
                                this.requests = arr;
                                console.log(arr);
                              });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrderPage');
  }
  clicked(){
    this.navCtrl.push(ProfilePage);
  }
  cardclick(item){

    this.navCtrl.push(Orderbooked2Page, {'payload' : item});

  }

}
