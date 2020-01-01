import { Component, ViewChild } from '@angular/core';
import { NavController, Navbar, NavParams, AlertController, ToastController, Toast } from 'ionic-angular';
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
  service: "";
  bookedDate: "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public fbService: FirebaseServices,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
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
      'userId', this.navParams.get('payload').uid)
      .then((response) => {

        let result = Object.entries(response);


        // append items to array
        this.latestReq = result[result.length - 1][1];
        
        this.service = this.latestReq['service'];
        this.bookedDate = this.latestReq['date'];

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

            console.log(this.afAuth.auth.currentUser['email']);
            this.fbService.login(this.afAuth.auth.currentUser['email'], data.password)
              .then((response) => {

                // Updating the edited details
                let email = 'users/' + (this.afAuth.auth.currentUser.uid) + '/email';
                let phoneNumber = 'users/' + (this.afAuth.auth.currentUser.uid) + '/phoneNumber';
                let name = 'users/' + (this.afAuth.auth.currentUser.uid) + '/name';
                let data = {};
                this.afAuth.auth.currentUser.updateEmail(this.editForm.controls['email'].value);
                data[email] = this.editForm.controls['email'].value;
                data[phoneNumber] = this.editForm.controls['phoneNumber'].value;
                data[name] = this.editForm.controls['name'].value;

                // updating in database
                this.fbService.updateField(data);

                document.documentElement.style.setProperty(`--teal`, '#18A0A0');
                document.documentElement.style.setProperty(`--header-profile`, '20%');

                let alert = this.alertCtrl.create({
                  message: 'Hurray..! The profile details are updated'
                });

                alert.present();

              })
              .catch((error) => {

                // displaying error toast
                let alert = this.alertCtrl.create({
                  message: 'Password is incorrect. Please enter the correct password'
                })
                alert.present();

                document.documentElement.style.setProperty(`--teal`, '#18A0A0');
                document.documentElement.style.setProperty(`--header-profile`, '20%');

              })

          }
        }
      ]
    });


    if (status == 1) {
      document.documentElement.style.setProperty(`--teal`, 'red');
      document.documentElement.style.setProperty(`--header-profile`, '0%');
    } else {

      let email = this.editForm.controls['email'].value;
      let name = this.editForm.controls['name'].value;
      let phoneNumber = this.editForm.controls['phoneNumber'].value;

      if (email != this.navParams.get('payload').email ||
        name != this.navParams.get('payload').name ||
        phoneNumber != this.navParams.get('payload').phoneNumber) {
        prompt.present();
      }
      else {

        // Toast for notifying user about the unedited details
        let toast = this.toastCtrl.create({
          message: 'Seems like you didn\'t changed anything',
          duration: 3000,
          position: 'bottom'
        });

        toast.present();

        document.documentElement.style.setProperty(`--teal`, '#18A0A0');
        document.documentElement.style.setProperty(`--header-profile`, '20%');
      }

    }
  }

  // Change Password
  changePassword() {

    let alertPrompt = this.alertCtrl.create({
      title: 'New Password',
      message: "Please enter the new password",
      inputs: [
        {
          name: 'oldPassword',
          placeholder: 'Old password'
        },
        {
          name: 'newPassword',
          placeholder: 'New password'
        }
      ],
      buttons: [
        {
          text: 'Done',
          handler: data => {
            // Local scoped user crdentials
            let user = this.afAuth.auth.currentUser

            // Reauthenticate to check if the old 
            // password entered is correct.

            this.fbService.login(user['email'], data.oldPassword)

              //if login is successful
              .then((response) => {

                //update password if login is successful
                //checking new password characters length for 6
                if (data.newPassword.length >= 6) {

                  user.updatePassword(data.newPassword)

                    //if update password is successful
                    .then((response) => {

                      // Display the alert message
                      let alert = this.alertCtrl.create({
                        title: 'Updated',
                        message: 'Password updated successfully...!'
                      });

                      alert.present();

                    })
                    .catch(function (error) {

                      // Display the alert message
                      let alert = this.alertCtrl.create({
                        title: 'Failed',
                        message: 'Some problem occured...Please try again later...!'
                      });

                      alert.present();
                    });
                }
                else {

                  // Display the alert message
                  let alert = this.alertCtrl.create({
                    title: 'Failed',
                    message: 'Password should be minimum of 6 characters'
                  });

                  alert.present();

                }
              })
              .catch((error) => {

                console.log(error);
                // Display the alert message
                let alert = this.alertCtrl.create({
                  title: 'Failed',
                  message: 'Enter the correct old password'
                });

                alert.present();
              });

          }
        },
        {
          text: 'cancel',
          handler: data => {

          }
        }
      ]
    });

    alertPrompt.present();
  }

}
