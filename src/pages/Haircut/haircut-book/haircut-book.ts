import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { HaircutPopupPage } from '../haircut-popup/haircut-popup';
import { c } from '@angular/core/src/render3';
import { FirebaseServices } from '../../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';
import { sha256, sha224 } from 'js-sha256';
import { HaircutConformationPage } from '../haircut-conformation/haircut-conformation';
import { ProfilePage } from '../../Common/profile/profile';
import { MyOrderPage } from '../../Common/my-order/my-order';
import { ShopHomePage } from '../../Haircut-Shop/shop-home/shop-home';
import { HaircutHomePage } from '../haircut-home/haircut-home';
import { HomePage } from '../../Common/home/home';


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

  // flag for timeslots presence
  timeSlotFlag: any = true;

  // Appointment count
  appointmentCount: any;

  // backup time slots
  backUpTimeSlots: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public fbService: FirebaseServices,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {


    this.getData();

    this.appointmentCount = 0;

    this.rawTimeSlots.forEach(element => {

      if (element['status'] == 1) {
        this.appointmentCount++;
      }

      else if (element['status'] == 2) {
        this.appointmentCount++;
        this.appointmentCount++;
      }

    });

  }

  // get the data from the previous page
  getData() {

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
    // let alteredH = '0' + h;
    let hA = h < 10 ? '0' + String(h) : h;
    var m = today.getMinutes();
    var timeNow = hA + ":" + m + ":" + '00';

    // filter the slots based on current time
    this.timeSlots = this.timeSlots.filter((element) => {

      if (timeNow < this.convertTime(element.time)) {
        return true;
      }
      else {
        return false;
      }
    });

    this.timeSlotFlag = Object.keys(this.timeSlots).length > 0 ? true : false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaircutBookPage');
  }

  popup(times) {
    const popover = this.popoverCtrl.create(HaircutPopupPage, { data: times, seatCapacity: this.selectedShop.seatCapacity });

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

    if (mm == 1 || mm == '01') {
      return 'Jan'
    }

    else if (mm == 2 || mm == '02') {
      return 'Feb'
    }

    else if (mm == 3 || mm == '03') {
      return 'Mar'
    }

    else if (mm == 4 || mm == '04') {
      return 'Apr'
    }

    else if (mm == 5 || mm == '05') {
      return 'May'
    }

    else if (mm == 6 || mm == '06') {
      return 'Jun'
    }

    else if (mm == 7 || mm == '07') {
      return 'July'
    }

    else if (mm == 8 || mm == '08') {
      return 'Aug'
    }

    else if (mm == 9 || mm == '09') {
      return 'Sept'
    }

    else if (mm == 10) {
      return 'Oct'
    }

    else if (mm == 11) {
      return 'Nov'
    }

    else if (mm == 12) {
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

    // loading instance
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    let dataToUpdate = [];

    if (this.selectedShop.seatCapacity == 2) {
      dataToUpdate = this.rawTimeSlots.map(element => {

        if (element.time == dataToBook.time) {

          element.first = dataToBook.first;
          element.second = dataToBook.second;
          element.status = dataToBook.status;

        }

        return element;

      });
    }
    else if (this.selectedShop.seatCapacity == 1) {

      dataToUpdate = this.rawTimeSlots.map(element => {

        if (element.time == dataToBook.time) {

          element.first = dataToBook.first;
          element.status = dataToBook.status;

        }

        return element;

      });

    }

    var d = new Date();
    var n = d.getMilliseconds();

    let appointmentId = 'MMN' + this.selectedShop.id + 'U' + n +
      this.afAuth.auth.currentUser.uid + dataToBook.time + this.toDate;

    // Hash using sha256
    appointmentId = sha256(appointmentId);


    let dataToRequest = {
      'appointmentId': appointmentId,
      'cost': 0,
      'date': this.toDate,
      'userId': this.afAuth.auth.currentUser.uid,
      'seats': {
        'first': 0,
        'second': 0
      },
      'service': 'Haircut',
      'shopId': this.selectedShop.id,
      'status': 0,
      'time': dataToBook.time,
      'transactionId': 0,
      'userName': '',
      'userPhoneNumber': '',
      'shopName': this.selectedShop.shopName,
      'userNotification': 0,
      'shopNotification': 0
    }

    if (this.selectedShop.seatCapacity == 2) {
      dataToRequest.seats.first = dataToBook.first;
      dataToRequest.seats.second = dataToBook.second;
    }
    else if (this.selectedShop.seatCapacity == 1) {
      dataToRequest.seats.first = dataToBook.first;
      dataToRequest.seats.second = 0;
    }

    // get the userName
    this.fbService.readOnce('users/' + this.afAuth.auth.currentUser.uid)
      .then((response) => {
        dataToRequest.userName = response['name'];
        dataToRequest.userPhoneNumber = response['phoneNumber'];


        let modal = this.modalCtrl.create(HaircutConformationPage, { payload: dataToRequest, dataToUpdate: dataToUpdate });
        modal.present();

        modal.onDidDismiss((status) => {

          var alert;
          if (status) {
            alert = this.alertCtrl.create({
              title: 'Booked',
              subTitle: 'Your Appointment was booked successfully...!',
              message: 'Waiting for Shop Approval',
              cssClass: 'bold-text',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.navCtrl.pop();
                  }
                }
              ]
            });
          } else {

            alert = this.alertCtrl.create({
              title: 'Failed',
              message: 'You have cancelled the Appointment Booking, please book again',
              buttons: [
                {
                  text: 'Okay',
                  handler: _ => {
                    const startIndex = this.navCtrl.getActive().index - 1;
                    this.navCtrl.remove(startIndex, 2)
                      .then((resp) => {
                        this.navCtrl.push(HaircutHomePage);
                      });
                  }
                }
              ]
            });
          }


          alert.present();
          loading.dismiss();


        });


      })
      .catch((error) => {

        // dismiss loading
        loading.dismiss();

        this.getData();

        // alert message
        var alert = this.alertCtrl.create({
          title: 'Failed',
          message: 'Something seems to be wrong, please try again later',
          buttons: [
            {
              text: 'Okay',
              handler: _ => {
                const startIndex = this.navCtrl.getActive().index - 1;
                this.navCtrl.remove(startIndex, 2)
                  .then((resp) => {
                    this.navCtrl.push(HaircutHomePage);
                  });
              }
            }
          ]
        });

        alert.present();
      })

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
