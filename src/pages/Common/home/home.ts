import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { PhotographyPage } from '../../Photography/photography/photography';
import { ProfilePage } from '../profile/profile';
import { MyOrderPage } from '../my-order/my-order';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseServices } from '../../../services/fireBaseService';
import { HaircutHomePage } from '../../Haircut/haircut-home/haircut-home';
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

                                this.navCtrl.push(ProfilePage, {'payload' : response});

                              })
                              .catch((error) => {
                                toast.present();
                              });
  }
  
  order(){
    this.navCtrl.push(MyOrderPage);
  }

  // nav to haircut page
  navToHaircut() {
    this.navCtrl.push(HaircutHomePage);
  }
  
}
