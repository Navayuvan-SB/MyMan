import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, UrlSerializer, ToastController, LoadingController } from 'ionic-angular';
import { FirebaseServices } from '../../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CallNumber } from '@ionic-native/call-number';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ShopOrdersPage } from '../shop-orders/shop-orders';

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
  metaData: any = {
    status: false,
    offer: ''
  }

  // latest Requests
  latestRequests: any;

  // orders flag
  orderFlag: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fbSercive: FirebaseServices,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public alertCtrl: AlertController,
    private call: CallNumber,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    let user = this.afAuth.auth.currentUser;

    // Loading instance
    let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });

    loading.present();

    this.fbSercive.readOnce('haircut/shops/' + user.uid)
      .then((response) => {

        if (response['status'] == 0) {
          this.metaData['status'] = "false";
        }
        else if (response['status'] == 1) {
          this.metaData['status'] = "true";
        }
        this.metaData['offer'] = response['offers'];

        loading.dismiss();

      })
      .catch((error) => {

        let toast = this.toastCtrl.create({
          message: 'Some error has occured, please try again',
          position: 'bottom',
          duration: 4000
        });

        toast.present();
        loading.dismiss();
      });

    // Loading instance
    let loadingR = this.loadingCtrl.create({
      content: 'Please wait'
    });

    loadingR.present();

    this.afDatabase.database.ref('requests').on('value', resp => {

      this.orderFlag = false;
      // Convert it into an array
      let obj = Object.entries(resp.val());

      this.latestRequests = [];

      obj.forEach(element => {

        if (element[1]['shopId'] == user.uid) {

          if (element[1]['status'] == 0) {

            // Add the request in an array
            this.latestRequests.push(element[1]);

            this.orderFlag = true;
          }
        }
      });

      loadingR.dismiss();

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopHomePage');
  }

  // Request Accepted
  acceptClicked(request) {

    // Loading instance
    let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });

    loading.present();

    let conformAlert = this.alertCtrl.create({
      title: 'Conformation',
      message: 'Are you sure want to accept the Appointment?',
      buttons: [
        {
          text: 'Okay',
          handler: _ => {

            // Change the status to 1
            request.status = 1;

            let path = 'requests/' + request.appointmentId;

            let data = {
              [path]: request
            }

            this.fbSercive.updateField(data)
              .then((response) => {

                // Alert for the completion
                let alert = this.alertCtrl.create({
                  title: 'Accepted',
                  message: 'Request Accepted successfully...!',
                  buttons: [
                    {
                      text: 'Okay'
                    }
                  ]
                });
                alert.present();
                loading.dismiss();
              })
              .catch((error) => {

                let alert = this.alertCtrl.create({
                  title: 'Oops',
                  message: 'Something is wrong, please try again later',
                  buttons: [
                    {
                      text: 'Okay'
                    }
                  ]
                });
                alert.present();
                loading.dismiss();
              });
          }
        },
        {
          text: 'No',
          handler: _ => {
            loading.dismiss();
          }
        }
      ]
    });

    conformAlert.present();

  }

  // Request declined
  rejectClicked(request) {


    // Loading instance
    let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });

    loading.present();

    let conformAlert = this.alertCtrl.create({
      title: 'Conformation',
      message: 'Are you sure want to reject the Appointment?',
      buttons: [
        {
          text: 'Yes',
          handler: _ => {

            // Change the status to 1
            request.status = 2;

            let path = 'requests/' + request.appointmentId;

            let data = {
              [path]: request
            }

            this.fbSercive.updateField(data)
              .then((response) => {

                // Alert for the completion
                let alert = this.alertCtrl.create({
                  title: 'Rejected',
                  message: 'Request Rejected successfully...!',
                  buttons: [
                    {
                      text: 'Okay'
                    }
                  ]
                });
                alert.present();
                loading.dismiss();
              })
              .catch((error) => {

                let alert = this.alertCtrl.create({
                  title: 'Oops',
                  message: 'Something is wrong, please try again later',
                  buttons: [
                    {
                      text: 'Okay'
                    }
                  ]
                });
                alert.present();
                loading.dismiss();
              });
          }
        },
        {
          text: 'No',
          handler: _ => {
            loading.dismiss();
          }
        }
      ]
    });

    conformAlert.present();

  }

  // Make call 
  makeCall(number) {

    this.call.callNumber(number, true);
  }

  // Display the offer list
  showOffer() {

    let alert = this.alertCtrl.create();
    alert.setTitle('Choose the offer');

    alert.addInput({
      type: 'radio',
      label: '10% Discount',
      value: '10',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: '20% Discount',
      value: '20',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: '30% Discount',
      value: '30',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: '40% Discount',
      value: '40',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: '50% Discount',
      value: '50',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: offer => {

        this.metaData.offer = offer;

        let path = 'haircut/shops/' + this.afAuth.auth.currentUser.uid + '/offers';
        let data = {
          [path]: offer
        };

        this.fbSercive.updateField(data)
          .then((response) => {

            let toast = this.toastCtrl.create({
              message: 'Offer Applied successfully',
              position: 'bottom',
              duration: 4000
            });

            toast.present();
          })
          .catch((error) => {

            let toast = this.toastCtrl.create({
              message: 'Some error has occured, please try again later',
              position: 'bottom',
              duration: 4000
            });

            toast.present();
          });

      }
    });
    alert.present();
  }

}
