import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { File } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { FirebaseServices } from '../../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-admin-new',
  templateUrl: 'admin-new.html',
})
export class AdminNewPage {

  shopDetails: any;

  shopForm: any;

  images: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public file: File,
    public imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public fbService: FirebaseServices,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth) {

    this.images = [];

    this.shopDetails = [
      {
        placeholder: 'Closing time',
        controlName: 'closingTime',
        type: 'text'
      },
      {
        placeholder: 'Opening time',
        controlName: 'openingTime',
        type: 'text'
      },
      {
        placeholder: 'City',
        controlName: 'city',
        type: 'text'
      },
      {
        placeholder: 'Contact Number',
        controlName: 'contactNumber',
        type: 'number'
      },
      {
        placeholder: 'Email',
        controlName: 'email',
        type: 'text'
      },
      {
        placeholder: 'Owner name',
        controlName: 'ownerName',
        type: 'text'
      },
      {
        placeholder: 'Pincode',
        controlName: 'pincode',
        type: 'text'
      },
      {
        placeholder: 'Seat Capacity',
        controlName: 'seatCapacity',
        type: 'number'
      },
      {
        placeholder: 'State',
        controlName: 'state',
        type: 'text'
      },
      {
        placeholder: 'Street',
        controlName: 'street',
        type: 'text'
      }
    ]

    this.shopForm = this.formBuilder.group({
      closingTime: ['', Validators.required],
      openingTime: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      ownerName: ['', Validators.required],
      pincode: ['', Validators.required],
      seatCapacity: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],
      contactNumber: ['', Validators.required],
      shopName: ['', Validators.required],
      googlepay: ['false'],
      phonepe: ['false'],
      paytm: ['false'],
      gender: ['',Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminNewPage');
  }

  // Select the image from the device
  selectImage() {

    var loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    var options: ImagePickerOptions = {
      maximumImagesCount: 5,
      width: 1920,
      height: 1080
    };

    this.imagePicker.getPictures(options)
      .then((result) => {

        this.images = [];
        for (var interval = 0; interval < result.length; interval++) {

          let filename = result[interval].substring(result[interval].lastIndexOf('/') + 1);
          let path = result[interval].substring(0, result[interval].lastIndexOf('/') + 1);
          this.file.readAsDataURL(path, filename)
            .then((response) => {
              this.images.push({ image: response, id: interval });
            })
            .catch((error) => {

              loading.dismiss();
              let toast = this.toastCtrl.create({
                message: error,
                position: 'bottom',
                duration: 4000
              });

              toast.present();

            });

        }

        loading.dismiss();

      })
      .catch((error) => {

        let toast = this.toastCtrl.create({
          message: error,
          position: 'bottom',
          duration: 4000
        });
        loading.dismiss();
        toast.present();

      });
  }

  // Register the shop
  registerShop() {

    var loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    let shopDetails = {
      "availablity": [{
        "close": this.shopForm.controls['closingTime'].value,
        "open": this.shopForm.controls['openingTime'].value
      }],
      "city": this.shopForm.controls['city'].value,
      "contactNumber": this.shopForm.controls['contactNumber'].value,
      "email": this.shopForm.controls['email'].value,
      "id": "",
      "offers": "0",
      "ownerName": this.shopForm.controls['ownerName'].value,
      "pincode": this.shopForm.controls['pincode'].value,
      "seatCapacity": this.shopForm.controls['seatCapacity'].value,
      "shopImage": this.images,
      "shopName": this.shopForm.controls['shopName'].value,
      "state": this.shopForm.controls['state'].value,
      "status": 0,
      "street": this.shopForm.controls['street'].value,
      "gender": this.shopForm.controls['gender'].value,
      "paymentOptions": {
        "googlepay": this.shopForm.controls['googlepay'].value,
        "paytm": this.shopForm.controls['paytm'].value,
        "phonepe": this.shopForm.controls['phonepe'].value
      },
      "timeSlots": this.generateTimeSlots(this.shopForm.controls['seatCapacity'].value)
    }
    
    this.checkIfUserExist(shopDetails.contactNumber)
      .then((response) => {

        if (response) {

          let toast = this.toastCtrl.create({
            message: 'User already exists, please try again later',
            position: 'bottom',
            duration: 4000
          });

          toast.present();
          loading.dismiss();
        }

        else {

          let passwordAlert = this.alertCtrl.create({
            title: 'Verification',
            message: 'Enter your password',
            inputs: [
              {
                name: 'password',
                placeholder: 'Password'
              }
            ],
            buttons: [
              {
                text: 'Okay',
                handler: _ => {

                  let email = this.afAuth.auth.currentUser.email;
                  this.fbService.login(email, _.password)
                    .then((resp) => {
                      this.fbService.signUp(shopDetails.email, shopDetails.contactNumber)
                        .then((response) => {
                          this.fbService.login(email, _.password);
                          let uid = response;

                          let data = {
                            email: shopDetails.email,
                            phoneNumber: shopDetails.contactNumber,
                            type: 'shop'
                          };

                          shopDetails.id = String(uid);

                          this.fbService.writeInDatabase('users/' + uid, data)
                            .then((response) => {

                              this.fbService.writeInDatabase('haircut/shops/' + uid, shopDetails)
                                .then((response) => {

                                  this.fbService.login(email, _.password);
                                  let alert = this.alertCtrl.create({
                                    title: 'Success',
                                    message: 'Shop added successfully'
                                  });

                                  alert.present();
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
                            message: 'User already exists, please try again later',
                            position: 'bottom',
                            duration: 4000
                          });

                          toast.present();
                          loading.dismiss();
                        });
                    })
                    .catch((error) => {

                      let toast = this.toastCtrl.create({
                        message: 'Password is incorrect',
                        position: 'bottom',
                        duration: 4000
                      });

                      toast.present();
                      loading.dismiss();
                    });
                }
              }
            ]
          });

          passwordAlert.present();
        }
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

  }

  checkIfUserExist(phone) {

    return new Promise((resolve, reject) => {

      this.fbService.filterData(this.fbService.equalTo, 'users', null, this.fbService.orderByChild, 'phoneNumber', phone)
        .then((response) => {

          let obj = Object.entries(response);

          obj.forEach(element => {
            resolve(true);
          });

          resolve(false);

        })
        .catch((error) => {
          reject();
        });

    });

  }

  // Generate time slots
  generateTimeSlots(seatCapacity) {

    if (seatCapacity == 2) {

      let timeSlots = [{
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "8:00 AM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "8:30 AM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "9:00 AM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "9:30 AM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "10:00 AM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "10:30 AM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "11:00 AM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "11:30 AM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "12:00 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "12:30 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "1:00 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "1:30 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "2:00 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "2:30 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "3:00 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "3:30 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "4:00 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "4:30 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "5:00 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "5:30 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "6:00 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "6:30 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "7:00 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "7:30 PM"
      }, {
        "first": 0,
        "second": 0,
        "state": 0,
        "status": 0,
        "time": "8:00 PM"
      }]

      return timeSlots;
    }

    else if (seatCapacity == 1) {

      let timeSlots = [{
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "8:00 AM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "8:30 AM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "9:00 AM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "9:30 AM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "10:00 AM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "10:30 AM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "11:00 AM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "11:30 AM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "12:00 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "12:30 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "1:00 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "1:30 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "2:00 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "2:30 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "3:00 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "3:30 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "4:00 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "4:30 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "5:00 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "5:30 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "6:00 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "6:30 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "7:00 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "7:30 PM"
      }, {
        "first": 0,
        "state": 0,
        "status": 0,
        "time": "8:00 PM"
      }]

      return timeSlots;
    }
  }

}
