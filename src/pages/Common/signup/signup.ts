import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseServices } from '../../../services/fireBaseService';
import { MustMatch } from '../../../validators/must-match';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage { 

  credentialForm : FormGroup;

  constructor(public navCtrl      : NavController, 
              public navParams    : NavParams,
              public fbService    : FirebaseServices,
              public formBuilder  : FormBuilder,
              public loadingCtrl  : LoadingController,
              public toastCtrl    : ToastController,
              public alterCtrl    : AlertController,
              public afAuth       : AngularFireAuth) {

                this.credentialForm = this.formBuilder.group({
                  email             : ['',
                                        Validators.compose([
                                          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$'),
                                          Validators.required
                                        ])],
                  phoneNumber       : ['',
                                        Validators.compose([
                                          Validators.pattern('^[0-9]+$'),
                                          Validators.required,
                                          Validators.minLength(10),
                                          Validators.maxLength(10)
                                        ])],
                  password          : ['',
                                        Validators.compose([
                                          Validators.minLength(8),
                                          Validators.required
                                        ])],
                  confirmPassword  :  ['',
                                        Validators.compose([
                                          Validators.minLength(8),
                                          Validators.maxLength(10),
                                          Validators.required
                                        ])],
                  name              : ['',
                                        Validators.compose([
                                          Validators.required,
                                          Validators.minLength(4)
                                        ])]
                },{

                  validator : MustMatch('password', 'confirmPassword')

                });


              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    console.log(this.afAuth.auth.currentUser);
  }

  navToLogin(){
    this.navCtrl.push(LoginPage);
  }

  // Sign Up function
  signUp(){

    let email       = this.credentialForm.controls['email'].value
    let password    = this.credentialForm.controls['password'].value
    let phoneNumber = this.credentialForm.controls['phoneNumber'].value
    let name        = this.credentialForm.controls['name'].value

    // loading instance
    let loading = this.loadingCtrl.create({
      content: 'please wait, your account is creating'
    });

    // toast instance
    let toast = this.toastCtrl.create({
      message   : 'Some error has occured. Please try agian',
      duration  : 2000,
      position  : 'bottom'
    });

    // alert instance
    let alert = this.alterCtrl.create({
      title       : 'Hurray..!',
      subTitle    : 'Your account has been created. Please login to continue',
      buttons     : [{
        text   : 'Okay',
        handler : data => {
          //         
        }
      }]
    });

    loading.present();
    this.fbService.signUp(email, password)
        .then((response) => {

          let uid = response;
          let node = {
              'email'         : email,
              'phoneNumber'   : phoneNumber,
              'name'          : name
           }

          this.fbService.writeInDatabase('users/' + uid, node)
              .then((response) => {

                loading.dismiss();
                alert.present()
              })
              .catch((error) => {
                loading.dismiss();
                toast.present()
              })

        })
        .catch((error) => {
          loading.dismiss();
          toast.present()
        });
  }


}
