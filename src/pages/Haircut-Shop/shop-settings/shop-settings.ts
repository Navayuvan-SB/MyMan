import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseServices } from '../../../services/fireBaseService';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../../validators/must-match';

/**
 * Generated class for the ShopSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shop-settings',
  templateUrl: 'shop-settings.html',
})
export class ShopSettingsPage {

  passwordForm: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public afAuth: AngularFireAuth,
    public fbService: FirebaseServices,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.compose([
        Validators.required
      ])],
      newPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      conformNewPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    }, {
      validator: MustMatch('newPassword', 'conformNewPassword')
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopSettingsPage');
  }

  // Change the password
  changePassword() {

    // Loading instance
    let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });

    loading.present();

    let oldPassword = this.passwordForm.controls['oldPassword'].value;
    let newPassword = this.passwordForm.controls['newPassword'].value;

    let user = this.afAuth.auth.currentUser;

    this.fbService.login(user.email, oldPassword)
      .then((response) => {

        user.updatePassword(newPassword)
          .then((response) => {

            let toast = this.toastCtrl.create({
              message: 'New password updated successfully',
              position: 'bottom',
              duration: 4000
            });

            toast.present();
            loading.dismiss();

          })
          .catch((error) => {

            let toast = this.toastCtrl.create({
              message: 'Some error has occured, please try again later',
              position: 'bottom',
              duration: 4000
            });

            toast.present();
            loading.dismiss();
          });


      })
      .catch((error) => {

        let toast = this.toastCtrl.create({
          message: 'Old password is wrong',
          position: 'bottom',
          duration: 4000
        });

        toast.present();

        loading.dismiss();

      });

  }

}
