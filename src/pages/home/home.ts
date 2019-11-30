import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { PhotographyPage } from '../photography/photography';
import { ProfilePage } from '../profile/profile';
import { MyOrderPage } from '../my-order/my-order';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseServices } from '../../services/fireBaseService';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl    : NavController,
              public afAuth     : AngularFireAuth,
              public fbService  : FirebaseServices,
              public toastCtrl  : ToastController) {

  }

  photography(){
    this.navCtrl.push(PhotographyPage);
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
  order(){
    this.navCtrl.push(MyOrderPage);
  }
}
