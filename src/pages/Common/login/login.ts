import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseServices } from '../../../services/fireBaseService';
import { ShopHomePage } from '../../Haircut-Shop/shop-home/shop-home';
import { AdminHomePage } from '../../admin/admin-home/admin-home';
import { ForgetPasswordPage } from '../forget-password/forget-password';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('phoneNumber') myInput;
  @ViewChild('password') password;

  credentialForm: FormGroup

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public fbService: FirebaseServices,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    this.credentialForm = this.formBuilder.group({
      phoneNumber: ['', Validators.compose([
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    });
    // this.myInput.setFocus();

  }

  ionViewDidEnter() {
    this.setFocusPhoneNumber();
    console.log('ionViewDidLoad LoginPage');
  }

  setFocusPhoneNumber() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150)
    
  }

  setFocusPassword() {
    setTimeout(() => {
      this.password.setFocus();
    }, 150)
  }

  navToSignUp() {

    this.navCtrl.push(SignupPage);
  }

  signIn() {

    // loading instance
    let loading = this.loadingCtrl.create({
      content: 'please wait, logging in'
    });

    // toast instance
    let toast = this.toastCtrl.create({
      duration: 2000,
      position: 'bottom'
    });

    var phoneNumber = this.credentialForm.controls['phoneNumber'].value;
    var password = this.credentialForm.controls['password'].value;

    loading.present();
    this.fbService.filterData(this.fbService.equalTo, 'users', null, this.fbService.orderByChild, 'phoneNumber', phoneNumber)
      .then((response) => {
        let obj = Object.entries(response);
        let email = obj[0][1].email;
        let type = obj[0][1].type;

        console.log(email);

        this.fbService.login(email, password)
          .then((response) => {
            loading.dismiss();

            // Redirect according the user type
            if (type == 'user') {
              this.navCtrl.setRoot(HomePage);
            }
            else if (type == 'shop') {
              this.navCtrl.setRoot(ShopHomePage);
            }
            else if (type == 'admin') {
              this.navCtrl.setRoot(AdminHomePage);
            }

          })
          .catch((error) => {
            // toast.present();
            loading.dismiss();
            if (error.message == "The password is invalid or the user does not have a password.") {
              toast.setMessage("Invalid username or password");
              toast.present();
            } else {
              toast.setMessage("Some error has occured. Please try again");
              toast.present();
            }
          });
      })
      .catch((error) => {
        loading.dismiss();
        toast.setMessage("Oops...! Phone number not found, Please signin to continue");
        toast.present();
      })
  }

  forgetPassword() {

    this.navCtrl.setRoot(ForgetPasswordPage);
  }

}
