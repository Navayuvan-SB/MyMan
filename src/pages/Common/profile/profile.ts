import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MyOrderPage } from '../my-order/my-order';
import { Orderbooked2Page } from '../orderbooked2/orderbooked2';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseServices } from '../../../services/fireBaseService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  // flag for edit status
  editStatus: number = 0;
  editFormIcon: boolean = false;

  // instance for formGroup
  editForm: FormGroup;

  // latest Request, packId and Booked date
  latestReq: any;
  packId: "";
  bookedDate: "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public fbService: FirebaseServices,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public afApp: AngularFireModule) {


    this.editForm = this.formBuilder.group({
      phoneNumber: [this.navParams.get('payload').phoneNumber, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      email: [this.navParams.get('payload').email, Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$'),
        Validators.required
      ])],
      name: [this.navParams.get('payload').name, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])]
    });

    this.fbService.filterData(this.fbService.equalTo,
      'requests', null, this.fbService.orderByChild,
      'userId', this.navParams.get('payload').email)
      .then((response) => {

        let result = Object.entries(response);


        // append items to array
        this.latestReq = result[result.length - 1][1];

        this.packId = this.latestReq.pack.id;
        this.bookedDate = this.latestReq.bookedDate;

      })
      .catch((error) => {
        console.log(error);
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  order() {
    this.navCtrl.push(MyOrderPage);
  }
  cardclick() {
    this.navCtrl.push(Orderbooked2Page, { 'payload': this.latestReq });
  }

  // update checkmark icon status
  editIconUpdate() {

    setTimeout(() => {
      this.editFormIcon = this.editForm.valid;
    }, 10);

  }

  //maintain the edit and view state
  editFired(status) {
    this.editStatus = status;
    this.editFormIcon = this.editForm.valid;

    const prompt = this.alertCtrl.create({
      title: 'Verification',
      message: "Please enter your password",
      inputs: [
        {
          name: 'password',
          placeholder: 'password'
        },
      ],
      buttons: [
        {
          text: 'Done',
          handler: data => {


            var user = this.afAuth.auth.currentUser;


          }
        }
      ]
    });


    if (status == 1) {
      document.documentElement.style.setProperty(`--teal`, 'red');
      document.documentElement.style.setProperty(`--header-profile`, '0%');
    } else {

      prompt.present();
      let email = 'users/' + (this.afAuth.auth.currentUser.uid) + '/email';
      let phoneNumber = 'users/' + (this.afAuth.auth.currentUser.uid) + '/phoneNumber';
      let name = 'users/' + (this.afAuth.auth.currentUser.uid) + '/name';
      let data = {};
      this.afAuth.auth.currentUser.updateEmail(email);
      data[email] = this.editForm.controls['email'].value;
      data[phoneNumber] = this.editForm.controls['phoneNumber'].value;
      data[name] = this.editForm.controls['name'].value;

      // updating in database
      this.fbService.updateField(data);
      document.documentElement.style.setProperty(`--teal`, '#18A0A0');
      document.documentElement.style.setProperty(`--header-profile`, '20%');
    }
  }

}
