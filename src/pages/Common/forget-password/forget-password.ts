import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  emailForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public afAuth: AngularFireAuth,
    public toastCtrl: ToastController) {

    this.emailForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$'),
        Validators.required
      ])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  sendLink() {

    this.afAuth.auth.sendPasswordResetEmail(this.emailForm.controls['email'].value)
      .then((response) => {

        let toast = this.toastCtrl.create({
          message: 'Password reset email sent successfully, please check your inbox',
          duration: 4000,
          position: 'bottom'
        });

        toast.present();
      })
      .catch((error) => {

        if (error.code == 'auth/user-not-found') {

          let toast = this.toastCtrl.create({
            message: 'User not found',
            duration: 4000,
            position: 'bottom'
          });

          toast.present();

          this.navCtrl.setRoot(LoginPage);
        }
        else {

          let toast = this.toastCtrl.create({
            message: 'Something has wrong, please try again later',
            duration: 4000,
            position: 'bottom'
          });

          toast.present();

        }
      });
  }

  navLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

}
