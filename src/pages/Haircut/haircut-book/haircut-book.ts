import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ModalController, ToastController } from 'ionic-angular';
import { HaircutPopupPage } from '../haircut-popup/haircut-popup';
import { c } from '@angular/core/src/render3';
import { FirebaseServices } from '../../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';
import { sha256, sha224 } from 'js-sha256';
import { HaircutConformationPage } from '../haircut-conformation/haircut-conformation';
import { ProfilePage } from '../../Common/profile/profile';
import { MyOrderPage } from '../../Common/my-order/my-order';

/**
 * Generated class for the HaircutBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-haircut-book',
  templateUrl: 'haircut-book.html',
})

export class HaircutBookPage {

  // selected shop
  selectedShop: any;

  // todate
  toDate: any;

  // timeSlots;
  timeSlots: any;
  rawTimeSlots: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public fbService: FirebaseServices,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController) {

    this.selectedShop = this.navParams.get('data');
    this.timeSlots = this.navParams.get('data')['timeSlots'];

    this.rawTimeSlots = this.timeSlots;

    // get the current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.toDate = dd + '-' + this.convertMonth(mm) + '-' + yyyy;

    // get the current time
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var timeNow = h + ":" + m + ":" + '00';

    timeNow = "12:8:00"
    // filter the slots based on current time
    this.timeSlots = this.timeSlots.filter((element) => {
      return (timeNow < this.convertTime(element.time))
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaircutBookPage');
  }

  popup(times) {
    const popover = this.popoverCtrl.create(HaircutPopupPage, { data: times });

    popover.onDidDismiss((data) => {

      console.log(data);
      if (data != undefined) {
        this.bookAppointment(data);
      }

    });

    popover.present();
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

  // time - 12hr to 24hr
  convertTime(time) {

    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;

    return (String(sHours + ":" + sMinutes + ":00"));

  }

  // book the seat 
  bookAppointment(dataToBook) {

    let dataToUpdate = this.rawTimeSlots.map(element => {

      if (element.time == dataToBook.time) {

        element.first = dataToBook.first;
        element.second = dataToBook.second;
        element.status = dataToBook.status;

      }

      return element;

    });

    // Update the data
    let path = 'haircut/shops/' + this.selectedShop.id + '/timeSlots';
    let data = {
      [path]: dataToUpdate
    }

    this.fbService.updateField(data)
      .then((response) => {

        // appointmentId
        var d = new Date();
        var n = d.getMilliseconds();

        let appointmentId = 'MMN' + this.selectedShop.id + 'U' + n +
          this.afAuth.auth.currentUser.uid + dataToBook.time + this.toDate;

        // Hash using sha256
        appointmentId = sha256(appointmentId);

        // data to update in request
        let dataToRequest = {
          'appointmentId': appointmentId,
          'cost': 0,
          'date': this.toDate,
          'userId': this.afAuth.auth.currentUser.uid,
          'seats': {
            'first': dataToBook.first,
            'second': dataToBook.second
          },
          'service': 'Haircut',
          'shopId': this.selectedShop.id,
          'status': 0,
          'time': dataToBook.time,
          'transactionId': 0,
          'userName': '',
          'shopName': this.selectedShop.shopName
        }

        // get the userName
        this.fbService.readOnce('users/' + this.afAuth.auth.currentUser.uid)
          .then((response) => {
            dataToRequest.userName = response['name'];

            // update in request set
            this.fbService.writeInDatabase('requests/' + appointmentId, dataToRequest)
              .then((response) => {

                let modal = this.modalCtrl.create(HaircutConformationPage, { payload: dataToRequest });
                modal.present();

              })
              .catch((error) => {

                // alert message
                var alert = this.alertCtrl.create({
                  title: 'Failed',
                  message: 'Something seems to be wrong, please try again later',
                  buttons: [
                    {
                      text: 'Okay'
                    }
                  ]
                });

                alert.present();
              });
          })
          .catch((error) => {

            // alert message
            var alert = this.alertCtrl.create({
              title: 'Failed',
              message: 'Something seems to be wrong, please try again later',
              buttons: [
                {
                  text: 'Okay'
                }
              ]
            });

            alert.present();
          })
      })
      .catch((error) => {

        // alert message
        var alert = this.alertCtrl.create({
          title: 'Failed',
          message: 'Something seems to be wrong, please try again later',
          buttons: [
            {
              text: 'Okay'
            }
          ]
        });

        alert.present();

      });


  }

  // nav to profile
  navToProfile() {
    let toast = this.toastCtrl.create({
      duration: 2000,
      message: "Check your internet connection",
      position: 'bottom'
    });

    let user = this.afAuth.auth.currentUser;
    this.fbService.readOnce('users/' + user.uid)
      .then((response) => {
        let details = Object.entries(response);
        let emailId = details[0][1];
        let phone = details[2][1];
        let fullName = details[1][1];

        let payload = {
          email: emailId,
          phoneNumber: phone,
          name: fullName
        }

        this.navCtrl.push(ProfilePage, { 'payload': payload });

      })
      .catch((error) => {
        toast.present();
      });

  }

  // nav to my order page
  navToMyOrders() {
    this.navCtrl.push(MyOrderPage);
  }

}
