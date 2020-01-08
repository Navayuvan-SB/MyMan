import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseServices } from '../../../services/fireBaseService';
import { sha256 } from 'js-sha256';

/**
 * Generated class for the OrderBookedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-order-booked',
  templateUrl: 'order-booked.html',
})
export class OrderBookedPage {

  source          : any;
  name            : string;
  nowDate         : any;
  fromDate        : any;
  functionType    : any;

  constructor(public navCtrl        : NavController, 
              public navParams      : NavParams,
              public fbAuth         : AngularFireAuth,
              public fbService      : FirebaseServices) {

                this.source = navParams.get('payload');
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                this.nowDate = date+' '+time;

                this.fromDate = this.source.fromDate;
                this.functionType = this.source.function;

                let user = this.fbAuth.auth.currentUser;
                // console.log(user.uid);

                this.fbService.readOnce('users/' + user.uid)
                    .then((response) => {

                      let details = Object.entries(response);

                      // Generate request Id
                      let reqId = sha256(details[1][1] + user.uid + Date.now());

                      this.source.appointmentId = reqId;
                      this.source.userId = user.uid;
                      this.name          = details[1][1];
                      this.source.bookedDate = this.nowDate;
                      this.source.userName   = this.name;
                      this.source.service = 'Photography';

                      // Write the request in database
                      this.fbService.writeInDatabase('requests/' + reqId, this.source);
                    })
                    .catch((error) => {
                      // console.log(error);
                    })

              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderBookedPage');
  }

}
