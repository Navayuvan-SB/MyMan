import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FirebaseServices } from '../../../services/fireBaseService';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ShopOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shop-orders',
  templateUrl: 'shop-orders.html',
})
export class ShopOrdersPage {

  // Requests on that date
  requests: any;

  // order Flag
  orderFlag: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public fbService: FirebaseServices,
    public alertCtrl: AlertController,
    public call: CallNumber,
    public loadingCtrl: LoadingController) {


    // Load the current data
    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    let toDate = {
      day: dd,
      month: mm,
      year: yyyy
    };

    this.loadData(toDate);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopOrdersPage');
  }

  // Load data from database 
  loadData(date) {

    // Loading instance
    let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });

    loading.present();

    this.orderFlag = false;

    if (date.day < 10) {
      date.day = "0" + date.day
    }

    let toDate = date.day + '-' + this.convertMonth(date.month) + '-' + date.year;
    console.log(toDate);
    this.fbService.filterData(this.fbService.equalTo, 'requests', null, this.fbService.orderByChild, 'date', toDate)
      .then((response) => {

        this.requests = [];

        let obj = Object.entries(response);
        let arr = []
        obj.forEach((element) => {

          this.orderFlag = true;

          element[1]['timeCompare'] = this.formatISO(element[1]['time'].split(':'));
          arr.push(element[1]);
        });

        this.sortoNTime(arr)
          .then((response) => {

            this.requests = response;

          });

        console.log(arr);
        loading.dismiss();
      })
      .catch((error) => {

        let toast = this.toastCtrl.create({
          message: 'Some error has occured, please try again...',
          position: 'bottom',
          duration: 4000
        });

        toast.present();
        loading.dismiss();
      });

  }

  dateSelected(event) {

    this.loadData(event);
  }

  // convert the month to it's key word
  convertMonth(mm) {

    if (mm == 1) {
      return 'Jan'
    }

    else if (mm = 2) {
      return 'Feb'
    }

    else if (mm = 3) {
      return 'Mar'
    }

    else if (mm = 4) {
      return 'Apr'
    }

    else if (mm = 5) {
      return 'May'
    }

    else if (mm = 6) {
      return 'Jun'
    }

    else if (mm = 7) {
      return 'July'
    }

    else if (mm = 8) {
      return 'Aug'
    }

    else if (mm = 9) {
      return 'Sept'
    }

    else if (mm = 10) {
      return 'Oct'
    }

    else if (mm = 11) {
      return 'Nov'
    }

    else if (mm = 12) {
      return 'Dec'
    }
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

            this.fbService.updateField(data)
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

            this.fbService.updateField(data)
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

  // Sort based on time
  sortoNTime(arr) {

    return new Promise((resolve) => {

      function compare(a, b) {


        if (Number(a.timeCompare) < Number(b.timeCompare)) {
          return -1;
        }
        if (Number(a.timeCompare) > Number(b.timeCompare)) {
          return 1;
        }
        return 0;
      }

      arr.sort(compare);

      resolve(arr);

    })

  }

  // Change time to whole numbers
  formatISO(time) {

    var hours = time[0];
    var noon = time[1].split(' ');

    if (noon[1] == 'PM') {
      hours = Number(hours) + 12;
    }

    var strTime = hours + noon[0];
    return strTime;
  }
}
