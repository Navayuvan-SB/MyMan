import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseServices } from '../../../services/fireBaseService';

/**
 * Generated class for the DeleteFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-delete-feedback',
  templateUrl: 'delete-feedback.html',
})
export class DeleteFeedbackPage {
  @ViewChild('myInput') myInput: ElementRef;

  reason: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth,
    public fbService: FirebaseServices, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteFeedbackPage');
  }

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  // Delete account 
  deleteAccount() {

    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure want to delete your account?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Yes',
          handler: _ => {

            let loading = this.loadingCtrl.create({
              content: 'Please wait'
            });

            loading.present();

            let user = this.afAuth.auth.currentUser;

            user.delete()
              .then((response) => {

                let path = 'users/' + user.uid;
                
                let data = {
                  [path]: {
                    email: '',
                    emailDeleted: user.email,
                    phoneNumber: '',
                    feedback: this.reason,
                    type: 'user'
                  }
                }


                this.fbService.updateField(data)
                  .then((response) => {

                    let successAlert = this.alertCtrl.create({
                      title: 'Deleted',
                      message: 'We will miss you..!'
                    });

                    successAlert.present();
                    loading.dismiss();

                  })
                  .catch((error) => {

                    let failedAlert = this.alertCtrl.create({
                      title: 'Failed',
                      message: 'Something wrong, please try again'
                    });

                    failedAlert.present();
                    loading.dismiss();

                  });

              })
              .catch((error) => {

                let failedAlert = this.alertCtrl.create({
                  title: 'Failed',
                  message: 'Something wrong, please try again'
                });

                failedAlert.present();
                loading.dismiss();

              });
          }
        }
      ]
    });

    alert.present();

  }


}
