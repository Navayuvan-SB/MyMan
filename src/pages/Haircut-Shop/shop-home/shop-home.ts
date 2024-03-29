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

  // Shop user
  user: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fbSercive: FirebaseServices,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public alertCtrl: AlertController,
    private call: CallNumber,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    this.user = this.afAuth.auth.currentUser;

    // Loading instance
    let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });

    loading.present();

    this.fbSercive.readOnce('haircut/shops/' + this.user.uid)
      .then((response) => {

        if (response['status'] == 0) {
          this.metaData['status'] = "false";
        }
        else if (response['status'] == 1) {
          this.metaData['status'] = "true";
        }
        this.metaData['offer'] = response['offers'];


        this.afDatabase.database.ref('requests').on('value', resp => {

          this.orderFlag = false;
          // Convert it into an array
          let obj = Object.entries(resp.val());

          this.latestRequests = [];

          obj.forEach(element => {

            if (element[1]['shopId'] == this.user.uid) {

              if (element[1]['status'] == 0) {

                // Add the request in an array
                this.latestRequests.push(element[1]);

                this.orderFlag = true;
              }
            }
          });
          
          this.sortUsingDate();
        });

       
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

    for (var i = 0; i <= 50; i = i + 5) {

      if (this.metaData.offer == i) {

        if (i == 0) {
          alert.addInput({
            type: 'radio',
            label: 'Null',
            value: '0',
            checked: true
          });
        }
        else {
          alert.addInput({
            type: 'radio',
            label: i + '% Discount',
            value: '0',
            checked: true
          });
        }

      }
      else {

        if (i == 0) {
          alert.addInput({
            type: 'radio',
            label: 'Null',
            value: '0',
            checked: false
          });
        }
        else {
          alert.addInput({
            type: 'radio',
            label: i + '% Discount',
            value: '0',
            checked: false
          });
        }

      }
    }


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

  // Shop Status Changed
  shopStatusChanged(event) {

    setTimeout(_ => {

      if (event.value == false && this.metaData.status !== event.value) {

        let path = 'haircut/shops/' + this.user.uid + '/status';

        let data = {
          [path]: 0
        };

        this.fbSercive.updateField(data)
          .then((response) => {

            let toast = this.toastCtrl.create({
              message: 'Shop Status Updated successfully',
              position: 'bottom',
              duration: 4000
            });

            toast.present();
          })
          .catch((error) => {

            let toast = this.toastCtrl.create({
              message: 'Shop Status Updated Failed, Please try again',
              position: 'bottom',
              duration: 4000
            });

            toast.present();

          });

        this.metaData.status = false;

      }

      else if (event.value == true && this.metaData.status !== event.value) {

        let path = 'haircut/shops/' + this.user.uid + '/status';

        let data = {
          [path]: 1
        };

        this.fbSercive.updateField(data)
          .then((response) => {

            let toast = this.toastCtrl.create({
              message: 'Shop Status Updated successfully',
              position: 'bottom',
              duration: 4000
            });

            toast.present();
          })
          .catch((error) => {

            let toast = this.toastCtrl.create({
              message: 'Shop Status Updated Failed, Please try again',
              position: 'bottom',
              duration: 4000
            });

            toast.present();

          });

        this.metaData.status = true;

      }

    }, 200);

  }

  // Sort the requests by latest
  sortUsingDate() {


    this.latestRequests.sort((a, b) => {

      var rawADate = a.date.split('-');
      var aTime = a.time.split(' ');
      var aDate = new Date(rawADate[1] + ' ' + rawADate[0] + ' ' + rawADate[2] + ' ' + aTime[0] + ':00 ' + aTime[1]);

      var rawBDate = b.date.split('-');
      var bTime = b.time.split(' ');
      var bDate = new Date(rawBDate[1] + ' ' + rawBDate[0] + ' ' + rawBDate[2] + ' ' + bTime[0] + ':00 ' + bTime[1]); -1

      return (aDate > bDate ? -1 : 1);

    });

  }

}
