import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl      : NavController, 
              public navParams    : NavParams,
              public fbService    : FirebaseServices,
              public afAuth       : AngularFireAuth,
              public loadingCtrl  : LoadingController,
              public toastCtrl    : ToastController) {

                let user = this.afAuth.auth.currentUser;

                let loading = this.loadingCtrl.create({
                  content: 'please wait'
                });

                loading.present();
                this.fbService.filterData(this.fbService.equalTo,
                                          'requests',
                                          null,
                                          this.fbService.orderByChild,
                                          'userId',
                                          user.email)
                              .then((response) => {
                                loading.dismiss();
                                let obj = Object.entries(response);
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

    let toast = this.toastCtrl.create({
      duration  : 2000,
      message   : "Check your internet connection",
      position  : 'bottom'
    });

    let user = this.afAuth.auth.currentUser;
    this.fbService.readOnce('users/' + user.uid)
                              .then((response) => {
                                let details = Object.entries(response);
                                let emailId = details[0][1];
                                let phone = details[2][1];
                                let fullName = details[1][1];

                                let payload = {
                                  email         : emailId,
                                  phoneNumber   : phone,
                                  name          : fullName
                                }
                                this.navCtrl.push(ProfilePage, {'payload' : payload});

                              })
                              .catch((error) => {
                                toast.present();
                              });
  }
  cardclick(item){

    this.navCtrl.push(Orderbooked2Page, {'payload' : item});

  }

}
