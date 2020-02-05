import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseServices } from '../../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CallNumber } from '@ionic-native/call-number';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private fbSercive: FirebaseServices, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public alertCtrl: AlertController, private call: CallNumber) {

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

    this.afDatabase.database.ref('requests').on('value', resp => {

      // Convert it into an array
      let obj = Object.entries(resp.val());

      this.latestRequests = [];

      obj.forEach(element => {

        if (element[1]['shopId'] == user.uid) {

          if (element[1]['status'] == 0) {

            // Add the request in an array
            this.latestRequests.push(element[1]);
          }
        }
      });

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopHomePage');
  }

  // Request Accepted
  acceptClicked(request) {

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
              });
          }
        },
        {
          text: 'No',
        }
      ]
    });

    conformAlert.present();

  }

  // Request declined
  rejectClicked(request) {

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
              });
          }
        },
        {
          text: 'No'
        }
      ]
    });

    conformAlert.present();

  }

  // Make call 
  makeCall(number) {

    this.call.callNumber(number, true);
  }

}
