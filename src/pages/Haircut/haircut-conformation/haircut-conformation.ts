import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { MyOrderPage } from '../../Common/my-order/my-order';
import { FirebaseServices } from '../../../services/fireBaseService';



/**
 * Generated class for the HaircutConformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-haircut-conformation',
  templateUrl: 'haircut-conformation.html',
})
export class HaircutConformationPage {

  // booking details
  bookedDetails: any;

  // No of seats
  numberOfSeats: any;

  // Data to update
  dataToUpdate: any;

  // Conformation checkbox
  conformed: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, private fbService: FirebaseServices,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController) {

    // get the details from the source page
    this.bookedDetails = this.navParams.get('payload');

    // get the data to update details
    this.dataToUpdate = this.navParams.get('dataToUpdate');

    console.log(this.dataToUpdate);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaircutConformationPage');
  }

  // dismiss the view
  dismiss() {
    this.viewCtrl.dismiss();
  }

  // nav to my orders
  navToMyOrders() {
    this.navCtrl.push(MyOrderPage);
  }

  bookClicked() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    // Update the data
    let path = 'haircut/shops/' + this.bookedDetails.shopId + '/timeSlots';
    let data = {
      [path]: this.dataToUpdate
    }

    this.fbService.updateField(data)
      .then((response) => {

        // update in request set
        this.fbService.writeInDatabase('requests/' + this.bookedDetails.appointmentId, this.bookedDetails)
          .then((response) => {
            loading.dismiss();
            this.viewCtrl.dismiss(true);

          })
          .catch((error) => {
            console.log(error);
            loading.dismiss();
            this.viewCtrl.dismiss(false);
          });

      })
      .catch((error) => {
        console.log(error);
        loading.dismiss();
        this.viewCtrl.dismiss(false);

      });

  }

}
