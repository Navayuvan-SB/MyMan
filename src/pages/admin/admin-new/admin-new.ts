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

  coverImage: any;

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
    this.coverImage = '../../../assets/imgs/add-image.png';

    this.shopDetails = [
      {
        placeholder: 'City',
        controlName: 'city',
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
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$'),
        Validators.required
      ])],
      ownerName: ['', Validators.required],
      pincode: ['', Validators.required],
      seatCapacity: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],
      contactNumber: ['', Validators.compose([
        Validators.pattern('^[0-9]+$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      shopName: ['', Validators.required],
      googlepay: ['false'],
      phonepe: ['false'],
      paytm: ['false'],
      cash: ['false'],
      gender: ['', Validators.required]
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
      maximumImagesCount: 3,
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

    let closingTime = this.shopForm.controls['closingTime'].value.split(':');
    let closingTimeFormated = this.formatAMPM(closingTime);

    let openingTime = this.shopForm.controls['openingTime'].value.split(':');
    let openingTimeFormated = this.formatAMPM(openingTime);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var toDate = dd + '-' + this.convertMonth(mm) + '-' + yyyy;

    let shopDetails = {
      "availablity": [{
        "close": closingTimeFormated,
        "open": openingTimeFormated
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
        "phonepe": this.shopForm.controls['phonepe'].value,
        "cash": this.shopForm.controls['cash'].value
      },
      "timeSlots": this.generateTimeSlots(this.shopForm.controls['seatCapacity'].value),
      "coverImage": this.coverImage,
      "dateAdded": toDate
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
                            type: 'shop',
                            name: shopDetails.ownerName
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

  // Convert 24hr to 12hr
  formatAMPM(date) {
    var hours = date[0];
    var minutes = date[1];
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  formatISO(date) {

    var hours = date[0];
    var minutes = date[1];
    var noon = date[2];

    if (noon == 'PM') {
      hours = hours + 12;
    }

    var strTime = hours + ":" + minutes;
    return strTime;
  }

  // Select the shop cover image
  selectCoverImage() {

    var loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    var options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 1920,
      height: 1080
    };

    this.imagePicker.getPictures(options)
      .then((result) => {

        for (var interval = 0; interval < result.length; interval++) {

          let filename = result[interval].substring(result[interval].lastIndexOf('/') + 1);
          let path = result[interval].substring(0, result[interval].lastIndexOf('/') + 1);
          this.file.readAsDataURL(path, filename)
            .then((response) => {
              this.coverImage = response;
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

  // convert the month to it's key word
  convertMonth(mm) {

    if (mm == '1' || mm == '01') {
      return 'Jan'
    }

    else if (mm == '2' || mm == '02') {
      return 'Feb'
    }

    else if (mm == '3' || mm == '03') {
      return 'Mar'
    }

    else if (mm == '4' || mm == '04') {
      return 'Apr'
    }

    else if (mm == '5' || mm == '05') {
      return 'May'
    }

    else if (mm == '6' || mm == '06') {
      return 'Jun'
    }

    else if (mm == '7' || mm == '07') {
      return 'July'
    }

    else if (mm == '8' || mm == '08') {
      return 'Aug'
    }

    else if (mm == '9' || mm == '09') {
      return 'Sept'
    }

    else if (mm == '10') {
      return 'Oct'
    }

    else if (mm == '11') {
      return 'Nov'
    }

    else if (mm == '12') {
      return 'Dec'
    }
  }

}
