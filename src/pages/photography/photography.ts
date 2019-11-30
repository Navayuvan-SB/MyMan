import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MyOrderPage } from '../my-order/my-order';
import { BookPage } from '../book/book';
import { FirebaseServices } from '../../services/fireBaseService';

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

  card      : string;
  packs     : any;
  loading   : any;
  toast     : any;
  constructor(public navCtrl      : NavController,
              public navParams    : NavParams,
              public fbService    : FirebaseServices,
              public loadingCtrl  : LoadingController,
              public toastCtrl    : ToastController) {

                // loading instance
                this.loading = this.loadingCtrl.create({
                  content: 'please wait'
                });

                // toast instance
                this.toast = this.toastCtrl.create({
                  message   : 'Some error has occured. Please try agian',
                  duration  : 2000,
                  position  : 'bottom'
                });

                this.fetchFromDb();
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotographyPage');
  }
  order(){
    this.navCtrl.push(MyOrderPage);
  }


  // fetch from Firebase Database
  fetchFromDb(){

    // start loading component 
    this.loading.present();
    this.fbService.readOnce('packs')
        .then((response) => {

          // terminate loading component 
          this.loading.dismiss();
          this.packs = response;
        })
        .catch((error) => {

          // terminate loading component
          this.loading.dismiss();

          // show toast message
          this.toast.present();
          
        });
  }

  // pack clicked
  packClicked(pack){

    let payload = {
      source  : 'photography',
      data    : pack
    };
    
    this.navCtrl.push(BookPage,{ payload: payload });

  }

}