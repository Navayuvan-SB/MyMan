import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { HaircutPopupPage } from '../haircut-popup/haircut-popup';
import { c } from '@angular/core/src/render3';
import { FirebaseServices } from '../../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';
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
    public afAuth: AngularFireAuth) {

    this.selectedShop = this.navParams.get('data');

    // get the current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.toDate = dd + '-' + this.convertMonth(mm) + '-' + yyyy;

    // get the time slots from database
    this.rawTimeSlots = this.selectedShop.timeSlots;

    // get the current time
    let hr, mn;
    var today = new Date();
    var h = today.getHours();
    if (h < 10) hr = "0" + h;
    var m = today.getMinutes();
    if (m < 10) mn = "0" + m;
    var timeNow = hr + ":" + mn + ":" + '00';

    // filter the slots based on current time
    this.timeSlots = this.rawTimeSlots.filter((element) => {
      return (timeNow < this.convertTime(element.time))
    });

    let dataToBook = this.navParams.get('dataToBook');

    if (dataToBook != undefined) {
      this.bookAppointment(dataToBook)
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaircutBookPage');
  }

  popup(times) {
    const popover = this.popoverCtrl.create(HaircutPopupPage, { data: times, selectedShop: this.selectedShop });

    //for terminating previous pages
    let currentindex = this.navCtrl.getActive().index;
    popover.onDidDismiss(() => {
      this.navCtrl.remove(currentindex - 1);
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
        console.log('Updated Successfully...!');
      })
      .catch((error) => {
        console.log('Updated Failed...!');
      });
    
    // appointmentId

    var d = new Date();
    var n = d.getMilliseconds(); 

    let appointmentId = 'MMN' + this.selectedShop.id + 'U' + n +
                        this.afAuth.auth.currentUser.uid + dataToBook.time + this.toDate;
    
    // get the userName
    let userName = '';
    this.fbService.readOnce('users/' + this.afAuth.auth.currentUser.uid)
    .then((response) => {
      userName = response['name'];
    })

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
      'service': 'haircut',
      'shopId': 'MMN' + this.selectedShop.id,
      'status': 0,
      'time': dataToBook.time,
      'transactionId': 0,
      'userName': userName
    }

    // update in request set
    this.fbService.writeInDatabase('requests' + appointmentId, dataToRequest)
    .then((response) => {
      console.log('Data written in requests successfully...!');
    })
    .catch((error) => {
      console.log('Data written in requests FAILED...!');
    });
    
  }

}
