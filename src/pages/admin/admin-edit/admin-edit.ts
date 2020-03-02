import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { File } from '@ionic-native/file';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { FirebaseServices } from '../../../services/fireBaseService';

/**
 * Generated class for the AdminEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin-edit',
  templateUrl: 'admin-edit.html',
})
export class AdminEditPage {

  images: any;

  shopDetails: any;

  shopForm: any;

  // coverImage
  coverImage: any;

  // availablity
  availablity: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public file: File,
    public imagePicker: ImagePicker,
    public toastCtrl: ToastController,
    public fbService: FirebaseServices,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {



    let shop = this.navParams.get('shop');

    this.images = shop.shopImage;
    this.coverImage = shop.coverImage;

    this.availablity = {}

    var dateClose = [];
    dateClose.push(shop.availablity[0].close.split(':')[0]);
    dateClose.push(shop.availablity[0].close.split(':')[1].split(' ')[0])
    dateClose.push(shop.availablity[0].close.split(':')[1].split(' ')[1])

    this.availablity['close'] = this.formatISO(dateClose);

    var dateOpen = [];
    dateOpen.push(shop.availablity[0].open.split(':')[0]);
    dateOpen.push(shop.availablity[0].open.split(':')[1].split(' ')[0])
    dateOpen.push(shop.availablity[0].open.split(':')[1].split(' ')[1])

    this.availablity['open'] = this.formatISO(dateOpen);

    console.log(this.formatISO(dateOpen));


    this.shopForm = this.formBuilder.group({
      closingTime: [, Validators.required],
      openingTime: [, Validators.required],
      city: [shop.city, Validators.required],
      email: [shop.email, Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$'),
        Validators.required
      ])],
      ownerName: [shop.ownerName, Validators.required],
      pincode: [shop.pincode, Validators.required],
      seatCapacity: [shop.seatCapacity, Validators.required],
      state: [shop.state, Validators.required],
      street: [shop.street, Validators.required],
      contactNumber: [shop.contactNumber, Validators.compose([
        Validators.pattern('^[0-9]+$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      shopName: [shop.shopName, Validators.required],
      googlepay: [shop.paymentOptions.googlepay],
      phonepe: [shop.paymentOptions.phonepe],
      paytm: [shop.paymentOptions.paytm],
      gender: [shop.gender, Validators.required],
      cash: [shop.paymentOptions.cash]
    });

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
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEditPage');
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

  // Update the shop 
  updateShop() {

    var loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    let closingTime = this.shopForm.controls['closingTime'].value.split(':');
    console.log(closingTime);
    let closingTimeFormated = this.formatAMPM(closingTime);
    console.log(closingTimeFormated);

    let openingTime = this.shopForm.controls['openingTime'].value.split(':');
    let openingTimeFormated = this.formatAMPM(openingTime);

    let shopDetails = {
      "availablity": [{
        "close": closingTimeFormated,
        "open": openingTimeFormated
      }],
      "city": this.shopForm.controls['city'].value,
      "contactNumber": this.navParams.get('shop').contactNumber,
      "email": this.navParams.get('shop').email,
      "id": this.navParams.get('shop').id,
      "offers": this.navParams.get('shop').offers,
      "ownerName": this.shopForm.controls['ownerName'].value,
      "pincode": this.shopForm.controls['pincode'].value,
      "seatCapacity": this.shopForm.controls['seatCapacity'].value,
      "shopImage": this.images,
      "shopName": this.shopForm.controls['shopName'].value,
      "state": this.shopForm.controls['state'].value,
      "status": this.navParams.get('shop').status,
      "street": this.shopForm.controls['street'].value,
      "timeSlots": this.navParams.get('shop').timeSlots,
      "gender": this.shopForm.controls['gender'].value,
      "paymentOptions": {
        "googlepay": this.shopForm.controls['googlepay'].value,
        "paytm": this.shopForm.controls['paytm'].value,
        "phonepe": this.shopForm.controls['phonepe'].value,
        "cash": this.shopForm.controls['cash'].value
      },
      "coverImage": this.coverImage
    };

    let path = "haircut/shops/" + this.navParams.get('shop').id

    let data = {
      [path]: shopDetails
    }

    this.fbService.updateField(data)
      .then((response) => {

        let alert = this.alertCtrl.create({
          title: 'Updated',
          message: 'Shop Details updated successfully'
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
  }

  // Convert 24hr to 12hr
  formatAMPM(date) {
    var hours = date[0];
    var minutes = date[1];
    var ampm = Number(hours) >= 12 ? 'PM' : 'AM';
    hours = Number(hours) % 12;
    hours = hours ? hours : 12;
    minutes = Number(minutes) < 10 && minutes != '00' ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  // convert 12hr to 24hr 
  formatISO(date) {

    var hours = date[0];
    var minutes = date[1];
    var noon = date[2];

    if (noon == 'PM') {
      hours = Number(hours) + 12;
    }
    else if (noon == 'AM') {

      if (Number(hours) < 10) {
        hours = 0 + hours;
      }

    }

    var strTime = hours + ":" + minutes;
    console.log(strTime);
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

}
