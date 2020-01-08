webpackJsonp([0],{

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_fireBaseService__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, formBuilder, fbService, toastCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.fbService = fbService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.credentialForm = this.formBuilder.group({
            phoneNumber: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].pattern('^[0-9]+$'),
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].maxLength(10),
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required
                ])],
            password: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(8)
                ])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.navToSignUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.signIn = function () {
        var _this = this;
        // loading instance
        var loading = this.loadingCtrl.create({
            content: 'please wait, logging in'
        });
        // toast instance
        var toast = this.toastCtrl.create({
            duration: 2000,
            position: 'bottom'
        });
        var phoneNumber = this.credentialForm.controls['phoneNumber'].value;
        var password = this.credentialForm.controls['password'].value;
        loading.present();
        this.fbService.filterData(this.fbService.equalTo, 'users', null, this.fbService.orderByChild, 'phoneNumber', phoneNumber)
            .then(function (response) {
            var obj = Object.entries(response);
            var email = obj[0][1].email;
            _this.fbService.login(email, password)
                .then(function (response) {
                loading.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            })
                .catch(function (error) {
                // toast.present();
                loading.dismiss();
                if (error.message == "The password is invalid or the user does not have a password.") {
                    toast.setMessage("Invalid username or password");
                    toast.present();
                }
                else {
                    toast.setMessage("Some error has occured. Please try again");
                    toast.present();
                }
            });
        })
            .catch(function (error) {
            loading.dismiss();
            toast.setMessage("Oops...! Phone number not found, Please signin to continue");
            toast.present();
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/login/login.html"*/'<ion-header>\n    <ion-navbar class="toolbar-background" hideBackButton>\n        <p class="toolbar-title">Login</p>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <form [formGroup]="credentialForm">\n    <ion-item no-line class="l1">\n      <!-- <ion-label stacked>Phone Number</ion-label> -->\n      <ion-input type="Number" \n                  placeholder="Phone Number"\n                  formControlName="phoneNumber"></ion-input>\n    </ion-item>\n\n    <ion-item \n      class="warning-on-input"\n      *ngIf="!credentialForm.controls.phoneNumber.valid && (credentialForm.controls.phoneNumber.dirty || submitAttempt)">\n        <p>Enter valid Phone number</p>\n    </ion-item>\n    \n    <ion-item class="l2">\n        <!-- <ion-label stacked>Password</ion-label> -->\n        <ion-input type="password" \n                    placeholder="Password"\n                    formControlName="password"></ion-input>\n    </ion-item>\n\n    <ion-item\n      class="warning-on-input"\n      *ngIf="!credentialForm.controls.password.valid && (credentialForm.controls.password.dirty || submitAttempt)">\n        <p>Password length should be 8 characters long</p>\n    </ion-item>\n      \n    <button  ion-button  round full \n          class="button" \n          (click)="signIn()"\n          [disabled]="!credentialForm.valid">SIGN IN</button>\n      \n    <p text-center class="navSignUp">  New user?  <a (click)="navToSignUp()"> Signup</a></p>\n  </form> \n</ion-content>'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Photography_photography_photography__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_order_my_order__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_fireBaseService__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Haircut_haircut_home_haircut_home__ = __webpack_require__(293);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, afAuth, fbService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.fbService = fbService;
        this.toastCtrl = toastCtrl;
    }
    HomePage.prototype.photography = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__Photography_photography_photography__["a" /* PhotographyPage */]);
    };
    HomePage.prototype.clicked = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            duration: 2000,
            message: "Check your internet connection",
            position: 'bottom'
        });
        var user = this.afAuth.auth.currentUser;
        this.fbService.readOnce('users/' + user.uid)
            .then(function (response) {
            var details = Object.entries(response);
            var emailId = details[0][1];
            var phone = details[2][1];
            var fullName = details[1][1];
            var payload = {
                email: emailId,
                phoneNumber: phone,
                name: fullName
            };
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */], { 'payload': payload });
        })
            .catch(function (error) {
            toast.present();
        });
    };
    HomePage.prototype.order = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__my_order_my_order__["a" /* MyOrderPage */]);
    };
    // nav to haircut page
    HomePage.prototype.navToHaircut = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__Haircut_haircut_home_haircut_home__["a" /* HaircutHomePage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/home/home.html"*/'<ion-header>\n  <ion-navbar hideBackButton >\n    <ion-title class="toolbar-title.toolbar-title-md">MyMan</ion-title>\n    <ion-buttons left class="Menu">\n        <button ion-button icon-only menuToggle>\n            <ion-icon name="menu" class="resize-icon"></ion-icon></button>\n    </ion-buttons>\n    <ion-buttons right class="hammer">\n        <button ion-button icon-only (click)="order()">\n          <ion-icon name="custom-hammer" class="resize-icon"></ion-icon></button>\n    </ion-buttons>\n    <ion-buttons right class="Union">\n        <button ion-button icon-only (click)="clicked()" >\n          <ion-icon name="custom-Union" class="resize-icon"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n\n      <!-- Photography -->\n      <ion-col col-sm-2 (click)="photography()">\n        <ion-avatar class="p1" style=" border: 1px solid black;">\n          <!--image-->\n        </ion-avatar>\n      <h1 text-center>Photography</h1>\n      <p text-center>Sample text</p>\n    </ion-col>\n\n    <!-- Haircut -->\n      <ion-col col-sm-2 (click)="navToHaircut()">\n          <ion-avatar class="h" style=" border: 1px solid black;">\n            <!--image-->\n      </ion-avatar>\n      <h1 text-center>Haircut</h1>\n      <p text-center>Sample text</p>\n            </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-sm-2>\n          <ion-avatar class="g" style=" border: 1px solid black;">\n            <!--image-->\n          </ion-avatar>\n          <h1 text-center>Grocery</h1>\n          <p text-center>Sample text</p>\n        </ion-col>\n        <ion-col col-sm-2>\n          <!-- <ion-avatar class="g" style=" border: 1px solid black;">\n            \n          </ion-avatar>\n          <h1 text-center>Grocery</h1>\n          <p text-center>Sample text</p> -->\n        </ion-col>\n      </ion-row>\n    </ion-grid>      \n      \n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_6__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Orderbooked2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Orderbooked2Page = /** @class */ (function () {
    function Orderbooked2Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = this.navParams.get('payload');
        console.log(this.item);
        this.status = this.item.status;
    }
    Orderbooked2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Orderbooked2Page');
    };
    Orderbooked2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-orderbooked2',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/orderbooked2/orderbooked2.html"*/'<!--\n  Generated template for the Orderbooked2Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title class="toolbar-title.toolbar-title-md">Order Booked</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <!-- For Photography -->\n  <div *ngIf="item.service == \'Photography\'">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-4>\n          <ion-avatar style=" border: 1px solid black;" class="i1">\n            <!----image-->\n          </ion-avatar>\n        </ion-col>\n        <ion-col col-8 class="l1"><b>Pack 1</b>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <h2 class="h2">Ordered by</h2>\n    <p class="p">{{ item.userName }}</p>\n\n    <ion-card class="card1">\n      <ion-item>\n        <h2>Function Name</h2>\n        <p>{{ item.function }}</p>\n        <h2>Function Date and Time</h2>\n        <p>{{ item.fromDate }}</p>\n        <h2>Event Start</h2>\n        <p>{{ item.fromDate }}</p>\n        <h2>Event End</h2>\n        <p>{{ item.toDate }}</p>\n      </ion-item>\n    </ion-card>\n\n    <ion-card class="card2">\n      <ion-item>\n        <h2>Function Name</h2>\n        <p>{{ item.function }}</p>\n        <h2>Function Date and Time</h2>\n        <p>{{ item.fromDate }}</p>\n      </ion-item>\n    </ion-card>\n\n    <ion-card class="card3">\n\n      <ion-item *ngIf="status == 0">\n        <ion-avatar item-start>\n          <img src="../../assets/imgs/camera1.jpg">\n        </ion-avatar>\n        <h2> </h2>\n        <h2>Photographer status</h2>\n        <p>\n          <ion-badge color="secondary">Pending</ion-badge>\n        </p>\n      </ion-item>\n\n      <ion-item *ngIf="status != 0">\n        <ion-avatar item-start>\n          <img src="../../assets/imgs/camera1.jpg">\n        </ion-avatar>\n        <h2>Photographer Name</h2>\n        <p>City</p>\n        <p>Phone Number</p>\n      </ion-item>\n    </ion-card>\n\n  </div>\n\n  <!-- For Haircut -->\n  <div *ngIf="item.service == \'Haircut\'">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-4>\n          <ion-avatar style=" border: 1px solid black;" class="i1">\n            <!----image-->\n          </ion-avatar>\n        </ion-col>\n        <ion-col col-8 class="l1"><b>Haircut</b>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <h2 class="h2">Ordered by</h2>\n    <p class="p">{{ item.userName }}</p>\n\n    <ion-card class="card1">\n      <ion-item>\n        <h2>Shop Name</h2>\n        <p>{{ item.shopName }}</p>\n        <h2>Time</h2>\n        <p>{{ item.time }}</p>\n        <h2>Date</h2>\n        <p>{{ item.date }}</p>\n        <h2>No. of Seats</h2>\n        <p *ngIf="item.seats.first == 1 && item.seats.second == 1">Seat No: 1, 2</p>\n        <p *ngIf="(item.seats.first == 0 && item.seats.second == 1)">Seat No: 2</p>\n        <p *ngIf="(item.seats.first == 1 && item.seats.second == 0)">Seat No: 1</p>\n      </ion-item>\n    </ion-card>\n\n    <ion-card class="card2">\n      <ion-item>\n        <h2>Transaction Id</h2>\n        <p>{{ item.transactionId }}</p>\n        <h2>Transaction Date</h2>\n        <p>{{ item.date }}</p>\n      </ion-item>\n    </ion-card>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/orderbooked2/orderbooked2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], Orderbooked2Page);
    return Orderbooked2Page;
}());

//# sourceMappingURL=orderbooked2.js.map

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 193;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseServices; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FirebaseServices = /** @class */ (function () {
    function FirebaseServices(fbAuth, fbDatabase) {
        this.fbAuth = fbAuth;
        this.fbDatabase = fbDatabase;
        // integer values for three sorting types
        this.orderByChild = 1;
        this.orderByKey = 2;
        this.orderByValue = 3;
        // integer values for five filtering methods
        this.limitToFirst = 1;
        this.limitToLast = 2;
        this.startAt = 3;
        this.endAt = 4;
        this.equalTo = 5;
    }
    // get the nodes under the parent as json object
    FirebaseServices.prototype.readOnce = function (parent) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbDatabase.database.ref(parent)
                .once("value")
                .then(function (snapshot) {
                resolve(snapshot.val());
            })
                .catch(function (error) {
                reject('Something is wrong');
            });
        });
    };
    // push in database
    FirebaseServices.prototype.pushInDatabase = function (parent, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbDatabase.database.ref(parent)
                .push(data)
                .then(function (snapshot) {
                resolve(snapshot);
            });
        });
    };
    // write data to database
    FirebaseServices.prototype.writeInDatabase = function (parent, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbDatabase.database.ref(parent)
                .set(data)
                .then(function (message) {
                resolve("Data written successfully");
            })
                .catch(function (error) {
                reject("Data written failed");
            });
        });
    };
    // update a field or append a child to the parent
    FirebaseServices.prototype.updateField = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbDatabase.database.ref()
                .update(data)
                .then(function () {
                resolve("Field updated successfully");
            })
                .catch(function (error) {
                reject("Field updation failed");
            });
        });
    };
    // remove a field
    FirebaseServices.prototype.removeField = function (parent, child) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbDatabase.database.ref(parent).child(child)
                .remove()
                .then(function () {
                resolve("Field removed successfully");
            })
                .catch(function () {
                reject("Field removal failed");
            });
        });
    };
    // orderBy Method
    FirebaseServices.prototype.orderData = function (method, parent, child) {
        var _this = this;
        if (child === void 0) { child = null; }
        return new Promise(function (resolve, reject) {
            if (method == _this.orderByChild) {
                _this.fbDatabase.database.ref(parent)
                    .orderByChild(child)
                    .once("value")
                    .then(function (snapshot) {
                    resolve(snapshot.val());
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
            else if (method == _this.orderByKey) {
                _this.fbDatabase.database.ref(parent)
                    .orderByKey()
                    .once("value")
                    .then(function (snapshot) {
                    var result = Array();
                    snapshot.val().forEach(function (element) {
                        result.push(element);
                    });
                    resolve(result);
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
            else if (method == _this.orderByValue) {
                _this.fbDatabase.database.ref(parent)
                    .orderByValue()
                    .once("value")
                    .then(function (snapshot) {
                    var result = Array();
                    snapshot.val().forEach(function (element) {
                        result.push(element);
                    });
                    resolve(result);
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
        });
    };
    // filter the data 
    FirebaseServices.prototype.filterData = function (method, parent, limit, orderByMethod, orderByChild, equalToString) {
        var _this = this;
        if (limit === void 0) { limit = null; }
        if (orderByMethod === void 0) { orderByMethod = null; }
        if (orderByChild === void 0) { orderByChild = null; }
        if (equalToString === void 0) { equalToString = null; }
        return new Promise(function (resolve, reject) {
            if (method == _this.limitToFirst) {
                _this.fbDatabase.database.ref(parent)
                    .limitToFirst(limit)
                    .once("value")
                    .then(function (snapshot) {
                    resolve(snapshot.val());
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
            else if (method == _this.limitToLast) {
                _this.fbDatabase.database.ref(parent)
                    .limitToLast(limit)
                    .once("value")
                    .then(function (snapshot) {
                    resolve(snapshot.val());
                })
                    .catch(function (error) {
                    reject(error);
                });
            }
            else if (method == _this.startAt) {
                if (orderByMethod == null) {
                    reject("orderBy Method missing");
                }
                else {
                    if (orderByMethod == _this.orderByChild) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByChild(orderByChild)
                            .startAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            var result = Array();
                            snapshot.forEach(function (element) {
                                result.push(element.val());
                            });
                            resolve(result);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByKey) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByKey()
                            .startAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            var result = Array();
                            snapshot.forEach(function (element) {
                                result.push(element.val());
                            });
                            resolve(result);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByValue) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByValue()
                            .startAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            var result = Array();
                            snapshot.forEach(function (element) {
                                result.push(element.val());
                            });
                            resolve(result);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                }
            }
            else if (method == _this.endAt) {
                if (orderByMethod == null) {
                    reject("orderBy Method missing");
                }
                else {
                    if (orderByMethod == _this.orderByChild) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByChild(orderByChild)
                            .endAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            var result = Array();
                            snapshot.forEach(function (element) {
                                result.push(element.val());
                            });
                            resolve(result);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByKey) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByKey()
                            .endAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            var result = Array();
                            snapshot.forEach(function (element) {
                                result.push(element.val());
                            });
                            resolve(result);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByValue) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByValue()
                            .endAt(limit)
                            .once("value")
                            .then(function (snapshot) {
                            var result = Array();
                            snapshot.forEach(function (element) {
                                result.push(element.val());
                            });
                            resolve(result);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                }
            }
            else if (method == _this.equalTo) {
                if (orderByMethod == null) {
                    reject("orderBy Method missing");
                }
                else {
                    if (orderByMethod == _this.orderByChild) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByChild(orderByChild)
                            .equalTo(equalToString)
                            .once("value")
                            .then(function (snapshot) {
                            var result = Array();
                            snapshot.forEach(function (element) {
                                result.push(element.val());
                            });
                            resolve(result);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByKey) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByKey()
                            .equalTo(equalToString)
                            .once("value")
                            .then(function (snapshot) {
                            var result = Array();
                            snapshot.forEach(function (element) {
                                result.push(element.val());
                            });
                            resolve(result);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                    else if (orderByMethod == _this.orderByValue) {
                        _this.fbDatabase.database.ref(parent)
                            .orderByValue()
                            .equalTo(equalToString)
                            .once("value")
                            .then(function (snapshot) {
                            var result = Array();
                            snapshot.forEach(function (element) {
                                result.push(element.val());
                            });
                            resolve(result);
                        })
                            .catch(function (error) {
                            reject(error);
                        });
                    }
                }
            }
        });
    };
    // login with email and password
    FirebaseServices.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbAuth.auth.signInWithEmailAndPassword(username, password)
                .then(function (response) {
                resolve(response);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    // sign up with username and password
    FirebaseServices.prototype.signUp = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fbAuth.auth.createUserWithEmailAndPassword(username, password)
                .then(function (response) {
                resolve(response.uid);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    FirebaseServices = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], FirebaseServices);
    return FirebaseServices;
}());

//# sourceMappingURL=fireBaseService.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validators_must_match__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, fbService, formBuilder, loadingCtrl, toastCtrl, alterCtrl, afAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fbService = fbService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alterCtrl = alterCtrl;
        this.afAuth = afAuth;
        this.credentialForm = this.formBuilder.group({
            email: ['',
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$'),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required
                ])],
            phoneNumber: ['',
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[0-9]+$'),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(10)
                ])],
            password: ['',
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(8),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required
                ])],
            confirmPassword: ['',
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(8),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(10),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required
                ])],
            name: ['',
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(4)
                ])]
        }, {
            validator: Object(__WEBPACK_IMPORTED_MODULE_5__validators_must_match__["a" /* MustMatch */])('password', 'confirmPassword')
        });
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
        console.log(this.afAuth.auth.currentUser);
    };
    SignupPage.prototype.navToLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    // Sign Up function
    SignupPage.prototype.signUp = function () {
        var _this = this;
        var email = this.credentialForm.controls['email'].value;
        var password = this.credentialForm.controls['password'].value;
        var phoneNumber = this.credentialForm.controls['phoneNumber'].value;
        var name = this.credentialForm.controls['name'].value;
        // loading instance
        var loading = this.loadingCtrl.create({
            content: 'please wait, your account is creating'
        });
        // toast instance
        var toast = this.toastCtrl.create({
            message: 'Some error has occured. Please try agian',
            duration: 2000,
            position: 'bottom'
        });
        // alert instance
        var alert = this.alterCtrl.create({
            title: 'Hurray..!',
            subTitle: 'Your account has been created.',
            buttons: [{
                    text: 'Okay',
                    handler: function (data) {
                        //         
                    }
                }]
        });
        loading.present();
        this.fbService.signUp(email, password)
            .then(function (response) {
            var uid = response;
            var node = {
                'email': email,
                'phoneNumber': phoneNumber,
                'name': name,
                'type': 'user'
            };
            _this.fbService.writeInDatabase('users/' + uid, node)
                .then(function (response) {
                loading.dismiss();
                alert.present();
            })
                .catch(function (error) {
                loading.dismiss();
                toast.present();
            });
        })
            .catch(function (error) {
            loading.dismiss();
            toast.present();
        });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/signup/signup.html"*/'<ion-header>\n  <ion-navbar class="toolbar-background" hideBackButton>\n    <ion-title class="toolbar-title.toolbar-title-md">Signup</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  \n    <ion-avatar  style=" border: 1px solid black;">\n        <!--image-->\n    </ion-avatar>\n\n<form [formGroup]="credentialForm"> \n\n\n  <ion-item class="l4">\n    <!-- <ion-label   position="floating"> Confirm Password</ion-label> -->\n    <ion-input type="text" \n                placeholder="Name"\n                formControlName="name"></ion-input>\n  </ion-item>\n\n  <ion-item \n      class="warning-on-input"\n      *ngIf="!credentialForm.controls.name.valid  && (credentialForm.controls.name.dirty || submitAttempt) && !credentialForm.controls.name.valid">\n    <p>Enter your name</p>\n  </ion-item>\n\n  <ion-item class="l1">\n    <!-- <ion-label  position="floating">Phone Number</ion-label> -->\n    <ion-input type="Number" \n                placeholder="Phone Number"\n                formControlName="phoneNumber"></ion-input>\n  </ion-item>\n\n  <ion-item \n      class="warning-on-input"\n      *ngIf="!credentialForm.controls.phoneNumber.valid  && (credentialForm.controls.phoneNumber.dirty || submitAttempt)">\n    <p>Please enter a valid Phone Number</p>\n  </ion-item>\n\n  <ion-item class="l2">\n    <!-- <ion-label    position="floating">Mail</ion-label> -->\n    <ion-input type="email" \n                placeholder="Email"\n                formControlName="email"></ion-input>\n  </ion-item>\n\n  <ion-item \n      class="warning-on-input"\n      *ngIf="!credentialForm.controls.email.valid  && (credentialForm.controls.email.dirty || submitAttempt)">\n    <p>Please enter a valid Email</p>\n  </ion-item>\n\n  <ion-item class="l3">\n    <!-- <ion-label  position="floating">Password</ion-label> -->\n    <ion-input type="password" \n                placeholder="Password"\n                formControlName="password"></ion-input>\n  </ion-item>\n\n  <ion-item \n      class="warning-on-input"\n      *ngIf="!credentialForm.controls.password.valid  && (credentialForm.controls.password.dirty || submitAttempt)">\n    <p>Password should be greater than 6 characters</p>\n  </ion-item>\n\n  <ion-item class="l4">\n    <!-- <ion-label   position="floating"> Confirm Password</ion-label> -->\n    <ion-input type="password" \n                placeholder="Confirm Password"\n                formControlName="confirmPassword"></ion-input>\n  </ion-item>\n\n  <ion-item \n      class="warning-on-input"\n      *ngIf="!credentialForm.controls.confirmPassword.valid  && (credentialForm.controls.password.dirty || submitAttempt) && !credentialForm.controls.confirmPassword.valid">\n    <p>Password and Conform password must be same</p>\n  </ion-item>\n  \n  <ion-buttons type="submit">\n  <button  ion-button  round full class="button" \n            (click)="signUp()"\n            [disabled]="!credentialForm.valid">SIGNUP</button>\n  </ion-buttons>\n    \n    <p text-center class="navLogin">  Already an user?  <a (click)="navToLogin()"> Login</a>\n    </p>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotographyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Common_my_order_my_order__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book_book__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the PhotographyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PhotographyPage = /** @class */ (function () {
    function PhotographyPage(navCtrl, navParams, fbService, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fbService = fbService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        // loading instance
        this.loading = this.loadingCtrl.create({
            content: 'please wait'
        });
        // toast instance
        this.toast = this.toastCtrl.create({
            message: 'Some error has occured. Please try agian',
            duration: 2000,
            position: 'bottom'
        });
        this.fetchFromDb();
    }
    PhotographyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PhotographyPage');
    };
    PhotographyPage.prototype.order = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__Common_my_order_my_order__["a" /* MyOrderPage */]);
    };
    // fetch from Firebase Database
    PhotographyPage.prototype.fetchFromDb = function () {
        var _this = this;
        // start loading component 
        this.loading.present();
        this.fbService.readOnce('photography/packs')
            .then(function (response) {
            // terminate loading component 
            _this.loading.dismiss();
            _this.packs = response;
        })
            .catch(function (error) {
            // terminate loading component
            _this.loading.dismiss();
            // show toast message
            _this.toast.present();
        });
    };
    // pack clicked
    PhotographyPage.prototype.packClicked = function (pack) {
        var payload = {
            source: 'photography',
            data: pack
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__book_book__["a" /* BookPage */], { payload: payload });
    };
    PhotographyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-photography',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Photography/photography/photography.html"*/'<!--\n  Generated template for the PhotographyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n     <ion-navbar>\n           <ion-title class="toolbar-title.toolbar-title-md">Photography</ion-title>\n                <ion-buttons right class="hamri8">\n                       <button ion-button icon-only (click)="order()"  >\n                                <ion-icon name="custom-hammer"></ion-icon>\n                       </button>\n                </ion-buttons>\n     </ion-navbar>\n</ion-header>\n\n<ion-content padding> \n    <ion-grid>\n\n        <ion-row *ngFor="let pack of packs">\n           <ion-col>\n                <ion-card (click)="packClicked(pack)" type="button" style=" border: 1px solid black; border-radius: 20px;" >\n                     <div class="c1" >\n                          <ion-card-content>\n                                  <ion-avatar class="img1" style=" border: 1px solid black;">\n                                           <!--image-->\n                                  </ion-avatar>\n                                   <ion-label class="p1" style="color:black;"><b>Pack {{ pack.id }}</b></ion-label>\n                          </ion-card-content>\n                     </div>\n               </ion-card>\n          </ion-col>\n        </ion-row>\n    \n    \n        <!-- <ion-row>\n           <ion-col>\n               <ion-card (click)="card2click()" type="button" style=" border: 1px solid black; border-radius: 20px;" >\n                     <div class="c1">\n                           <ion-card-content>\n                                   <ion-avatar class="img2" style=" border: 1px solid black;">\n                                         image-->\n                                   <!-- </ion-avatar>\n                                   <ion-label class="p1" style="color:black;"><b>Pack 2</b></ion-label>\n                           </ion-card-content>\n                     </div>\n        \n                </ion-card>\n            </ion-col>\n        </ion-row> \n\n        <ion-row>\n             <ion-col>\n                  <ion-card (click)="card3click()" type="button" style=" border: 1px solid black; border-radius: 20px;" >\n                        <div class="c1">\n                               <ion-card-content>\n                                    <ion-avatar class="img3" style=" border: 1px solid black;"> -->\n                                           <!--image-->\n                                    <!-- </ion-avatar>\n                                    <ion-label class="p1" style="color:black;"><b>Pack 3</b></ion-label>\n                               </ion-card-content>\n                        </div>\n                   </ion-card>\n             </ion-col>\n      </ion-row> -->\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Photography/photography/photography.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], PhotographyPage);
    return PhotographyPage;
}());

//# sourceMappingURL=photography.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Common_my_order_my_order__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_booked_order_booked__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_myManService__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_fireBaseService__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BookPage = /** @class */ (function () {
    function BookPage(navCtrl, navParams, alertCtrl, modalCtrl, mmnService, fbService, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.mmnService = mmnService;
        this.fbService = fbService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        // input fields
        this.selectedFunction = "";
        this.fromTime = "";
        this.toTime = "";
        this.locationBooked = "";
        // Estimated amount
        this.estimatedAmount = 0;
        // status flag for checkout
        this.checkoutSatus = false;
        // loading instance
        this.loading = this.loadingCtrl.create({
            content: 'please wait'
        });
        // toast instance
        this.toast = this.toastCtrl.create({
            duration: 2500,
            position: 'bottom'
        });
        // get the value from source page
        this.source = navParams.get('payload');
        this.pack = this.source.data;
        // get the functions details
        this.fbService.readOnce('photography/functions')
            .then(function (response) {
            _this.functions = response;
        })
            .catch(function (error) {
            // handle error
            _this.toast.setMessage("Network connection error..!");
            _this.toast.present();
        });
    }
    BookPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookPage');
    };
    BookPage.prototype.order = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__Common_my_order_my_order__["a" /* MyOrderPage */]);
    };
    // checkout method
    BookPage.prototype.checkout = function () {
        if (this.checkoutSatus) {
            var payload = {
                pack: this.pack,
                cost: this.estimatedAmount,
                fromDate: this.fromTime,
                toDate: this.toTime,
                function: this.selectedFunction,
                location: this.locationBooked,
                status: 0
            };
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_booked_order_booked__["a" /* OrderBookedPage */], { payload: payload });
        }
        else {
            this.toast.setMessage("Choose the fields correctly..!");
            this.toast.present();
        }
    };
    // function dropdown
    BookPage.prototype.functionType = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Functions');
        this.functions.forEach(function (element) {
            alert.addInput({
                type: 'radio',
                label: element.name,
                value: element.name,
                checked: false
            });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                _this.selectedFunction = data;
            }
        });
        alert.present();
    };
    //update EST
    BookPage.prototype.updateEstimatedAmount = function () {
        var _this = this;
        // call amount estimation function
        if (this.fromTime != "" && this.toTime != "" && this.selectedFunction != "") {
            this.checkoutSatus = true;
            this.mmnService.updateETA(this.fromTime, this.toTime, this.pack)
                .then(function (response) {
                _this.estimatedAmount = Number(response);
            })
                .catch(function (error) {
                _this.estimatedAmount = Number(error);
                _this.toast.setMessage("From and To date incorrect");
                _this.toast.present();
            });
        }
        else {
            this.checkoutSatus = false;
        }
    };
    // location clicked
    BookPage.prototype.location = function () {
        console.log("Location clicked");
    };
    BookPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-book',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Photography/book/book.html"*/'<!--\n  Generated template for the BookPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title class="toolbar-title.toolbar-title-md">Book</ion-title>\n    <ion-buttons right class="hamri8">\n      <button ion-button icon-only (click)="order()">\n        <ion-icon name="custom-hammer"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="d1">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-4>\n          <ion-avatar style=" border: 1px solid black;" class="i1">\n            <!----image-->\n          </ion-avatar>\n        </ion-col>\n        <ion-col col-8 class="l1"><b>Pack {{ pack.id }}</b>\n        </ion-col>\n\n      </ion-row>\n      <ion-row>\n        <ion-col col-12><b>Function Type</b></ion-col>\n      </ion-row>\n      <ion-row (click)="functionType()" class="b1" id="function-type">\n          <ion-col col-10>\n            <ion-label>\n              {{ selectedFunction }}\n            </ion-label>\n          </ion-col>\n          <ion-col col-2>\n            <ion-icon class="icon1" name="custom-Downarrow"></ion-icon>\n          </ion-col>\n      </ion-row>\n      <ion-row *ngIf="selectedFunction == \'Others\'">\n        <ion-item class="l2">\n          <!-- <ion-label stacked>Password</ion-label> -->\n          <ion-input type="text" placeholder="type your function" [(ngModel)]="otherFunctionName"></ion-input>\n        </ion-item>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6><b>From</b></ion-col>\n        <ion-col col-6><b>To</b></ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6 (click)="picker.open()">\n              \n          <button class="b3" style=" border: 1px solid black;" ion-button round outline icon-end>\n            <ion-row class="fullWidth">\n              <ion-col col-9 class="fullWidth">\n                <ion-datetime #picker pickerFormat="DD MM YYYY" [(ngModel)]="fromTime"\n                  (ngModelChange)="updateEstimatedAmount()">\n                </ion-datetime>\n              </ion-col>\n              <ion-col col-3>\n                <ion-icon name="custom-calendar" class="icon1"></ion-icon>\n              </ion-col>\n            </ion-row>\n          </button>\n          \n        </ion-col>\n        <ion-col col-6 (click)="picker1.open()">\n          <button class="b3" style=" border: 1px solid black;" ion-button round outline icon-end>\n            <ion-row class="fullWidth">\n              <ion-col col-9 class="fullWidth">\n                <ion-datetime #picker1 pickerFormat="DD MM YYYY" [(ngModel)]="toTime"\n                  (ngModelChange)="updateEstimatedAmount()">\n                </ion-datetime>\n              </ion-col>\n              <ion-col col-3>\n                <ion-icon name="custom-calendar" class="icon1"></ion-icon>\n              </ion-col>\n            </ion-row>\n\n          </button>\n        </ion-col>\n\n      </ion-row>\n      <ion-row>\n        <ion-col col-12><b>Address or Location</b></ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-12 (click)="location()">\n          <button class="b1" (ngModelChange)="updateEstimatedAmount()" style=" border: 1px solid black;" ion-button\n            icon-end round outline>\n            <ion-row class="fullWidth">\n              <ion-col col-9 class="btnText">\n\n              </ion-col>\n              <ion-col col-3>\n                <ion-icon name="custom-places" class="icon1"></ion-icon>\n              </ion-col>\n            </ion-row>\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>\n\n<ion-footer no-border>\n  <div class="d2">\n    <ion-label class="l4">INR {{ estimatedAmount }}</ion-label>\n    <ion-label class="l5">Estimated Amount</ion-label>\n    <button (click)="checkout()" class="b5" ion-button round outline>\n      CHECK OUT\n    </button>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Photography/book/book.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__services_myManService__["a" /* MyManService */],
            __WEBPACK_IMPORTED_MODULE_5__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], BookPage);
    return BookPage;
}());

//# sourceMappingURL=book.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderBookedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_sha256__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_sha256___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_js_sha256__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the OrderBookedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrderBookedPage = /** @class */ (function () {
    function OrderBookedPage(navCtrl, navParams, fbAuth, fbService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fbAuth = fbAuth;
        this.fbService = fbService;
        this.source = navParams.get('payload');
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.nowDate = date + ' ' + time;
        this.fromDate = this.source.fromDate;
        this.functionType = this.source.function;
        var user = this.fbAuth.auth.currentUser;
        // console.log(user.uid);
        this.fbService.readOnce('users/' + user.uid)
            .then(function (response) {
            var details = Object.entries(response);
            // Generate request Id
            var reqId = Object(__WEBPACK_IMPORTED_MODULE_4_js_sha256__["sha256"])(details[1][1] + user.uid + Date.now());
            _this.source.appointmentId = reqId;
            _this.source.userId = user.uid;
            _this.name = details[1][1];
            _this.source.bookedDate = _this.nowDate;
            _this.source.userName = _this.name;
            _this.source.service = 'Photography';
            // Write the request in database
            _this.fbService.writeInDatabase('requests/' + reqId, _this.source);
        })
            .catch(function (error) {
            // console.log(error);
        });
    }
    OrderBookedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderBookedPage');
    };
    OrderBookedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-order-booked',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Photography/order-booked/order-booked.html"*/'<!--\n  Generated template for the OrderBookedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title class="toolbar-title.toolbar-title-md">Order Booked</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="wrapper">\n    <img src="../../assets/imgs/order_placed.png" style="margin-top: 40px" />\n  </div>\n\n\n\n  <ion-grid style="margin-top: 80px">\n\n    <ion-row>\n      <ion-col align-items-center col-5>\n        <div class="bold">Odered by</div>\n      </ion-col>\n      <ion-col align-items-center col-1>\n        <div class="bold">:</div>\n      </ion-col>\n      <ion-col align-items-start col-4>\n        <div>{{ name }}</div>\n      </ion-col>\n    </ion-row>\n\n\n    <ion-row>\n      <ion-col align-items-center col-5>\n        <div class="bold">Function Name</div>\n      </ion-col>\n      <ion-col align-items-center col-1>\n        <div class="bold">:</div>\n      </ion-col>\n      <ion-col align-items-start col-4>\n        <div>{{ functionType }}</div>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col align-items-center col-5>\n        <div class="bold">Function Date and Time</div>\n      </ion-col>\n      <ion-col align-items-center col-1>\n        <div class="bold">:</div>\n      </ion-col>\n      <ion-col align-items-start col-6>\n        <div>{{ fromDate }}</div>\n      </ion-col>\n    </ion-row>\n\n\n    <ion-row>\n      <ion-col align-items-center col-5>\n        <div class="bold">Transaction ID</div>\n      </ion-col>\n      <ion-col align-items-center col-1>\n        <div class="bold">:</div>\n      </ion-col>\n      <ion-col align-items-start col-6>\n        <div>126hdh89asd123d12</div>\n      </ion-col>\n    </ion-row>\n\n\n    <ion-row>\n      <ion-col align-items-center col-5>\n        <div class="bold">Transaction Time</div>\n      </ion-col>\n      <ion-col align-items-center col-1>\n        <div class="bold">:</div>\n      </ion-col>\n      <ion-col align-items-start col-6>\n        <div>{{ nowDate | date }}</div>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-card>\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="../../assets/imgs/camera1.jpg">\n      </ion-avatar>\n      <h2> </h2>\n      <h2>Photographer status</h2>\n      <p>\n        <ion-badge color="secondary">Pending</ion-badge>\n      </p>\n    </ion-item>\n\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Photography/order-booked/order-booked.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__["a" /* FirebaseServices */]])
    ], OrderBookedPage);
    return OrderBookedPage;
}());

//# sourceMappingURL=order-booked.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyManService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fireBaseService__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MyManService = /** @class */ (function () {
    function MyManService(fbService) {
        var _this = this;
        this.fbService = fbService;
        // fetch the pack details
        this.fbService.readOnce('packs')
            .then(function (response) {
            _this.pack = response;
        })
            .catch(function (error) {
        });
        // fetch the photographer details
        this.fbService.readOnce('photographers')
            .then(function (response) {
            _this.photographer = response;
        })
            .catch(function (error) {
        });
    }
    // update the Estimated amount of Booking
    MyManService.prototype.updateETA = function (fromTime, toTime, pack) {
        return new Promise(function (resolve, reject) {
            console.log({ fromTime: fromTime, toTime: toTime, pack: pack });
            var ETA = 0;
            var cost = Number(pack.cost);
            var sTime = new Date(fromTime);
            var eTime = new Date(toTime);
            var utc1 = Date.UTC(sTime.getFullYear(), sTime.getMonth(), sTime.getDate());
            var utc2 = Date.UTC(eTime.getFullYear(), eTime.getMonth(), eTime.getDate());
            var difference = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
            ;
            if (difference < 0) {
                ETA = 0;
                reject(ETA);
            }
            else if (difference == 0) {
                ETA = 1 * cost;
            }
            else {
                ETA = (difference + 1) * cost;
            }
            resolve(ETA);
        });
    };
    MyManService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__fireBaseService__["a" /* FirebaseServices */]])
    ], MyManService);
    return MyManService;
}());

//# sourceMappingURL=myManService.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HaircutHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_fireBaseService__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__haircut_book_haircut_book__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Common_profile_profile__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Common_my_order_my_order__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HaircutHomePage = /** @class */ (function () {
    function HaircutHomePage(navCtrl, navParams, fbService, afAuth, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fbService = fbService;
        this.afAuth = afAuth;
        this.toastCtrl = toastCtrl;
        // object array of shops
        this.shopArray = [];
        // location for filtering the shops
        this.location = "Dindigul";
        // read the shops list from db
        this.fbService.readOnce('haircut/shops')
            .then(function (response) {
            var obj = Object.entries(response);
            _this.loadedShopArray = [];
            obj.forEach(function (shop) {
                if (shop[1]['city'] == _this.location) {
                    _this.loadedShopArray.push(shop[1]);
                }
            });
            _this.initializeItems();
        })
            .catch(function (error) {
        });
    }
    HaircutHomePage.prototype.initializeItems = function () {
        this.shopArray = this.loadedShopArray;
    };
    HaircutHomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HaircutHomePage');
    };
    // filtering the shops based on shop name
    HaircutHomePage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.shopArray = this.shopArray.filter(function (item) {
                return (item.shopName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    // nav to selected shop
    HaircutHomePage.prototype.shopSelected = function (shop) {
        var payload = {
            source: 'haircut-home',
            data: shop
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__haircut_book_haircut_book__["a" /* HaircutBookPage */], payload);
    };
    // nav to profile
    HaircutHomePage.prototype.navToProfile = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            duration: 2000,
            message: "Check your internet connection",
            position: 'bottom'
        });
        var user = this.afAuth.auth.currentUser;
        this.fbService.readOnce('users/' + user.uid)
            .then(function (response) {
            var details = Object.entries(response);
            var emailId = details[0][1];
            var phone = details[2][1];
            var fullName = details[1][1];
            var payload = {
                email: emailId,
                phoneNumber: phone,
                name: fullName
            };
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__Common_profile_profile__["a" /* ProfilePage */], { 'payload': payload });
        })
            .catch(function (error) {
            toast.present();
        });
    };
    // nav to my order page
    HaircutHomePage.prototype.navToMyOrders = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__Common_my_order_my_order__["a" /* MyOrderPage */]);
    };
    HaircutHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-haircut-home',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Haircut/haircut-home/haircut-home.html"*/'<!--\n  Generated template for the HaircutHomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<!-- Title display -->\n\n<ion-header>\n  <ion-navbar>\n\n    <ion-title class="toolbar-title.toolbar-title-md">Haircut</ion-title>\n\n    <ion-buttons right class="Union" (click)="navToProfile()">\n      <button ion-button icon-only>\n        <ion-icon name="custom-Union" class="resize-icon"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-buttons right class="hammer" (click)="navToMyOrders()">\n      <button ion-button icon-only>\n        <ion-icon name="custom-hammer" class="resize-icon"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <!-- Search display -->\n\n  <ion-grid>\n    <ion-row row-12>\n      <ion-col>\n          <!-- <ion-input placeholder="Search" (ionInput)="getItems($event)"></ion-input> -->\n          <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!-- First card display -->\n\n  <ion-grid class="card-position" *ngFor="let shop of shopArray" (click)="shopSelected(shop)">\n\n    <!-- Card area -->\n\n    <ion-card class="card-area" type="button" style=" border: 1.3px solid #a9a9a9;">\n      <ion-card-content>\n        <ion-row>\n          <!-- Card picture -->\n\n          <ion-col col-4>\n\n            <ion-avatar class="image" style=" border: 1px solid #a9a9a9;">\n            </ion-avatar>\n          </ion-col>\n\n          <!-- Card content -->\n\n          <ion-col col-7>\n            <ion-label class="Ist-label-pos first-last-label"><b>{{ shop.shopName }}</b></ion-label>\n            <ion-label class="other-label-pos mid-all-label">{{ shop.street }}</ion-label>\n            <ion-label class="other-label-pos mid-all-label">{{ shop.city }}</ion-label>\n            <ion-label class="other-label-pos mid-all-label">{{ shop.state }}</ion-label>\n            <ion-label class="other-label-pos mid-all-label">Today Offer: {{ shop.offers }}%</ion-label>\n          </ion-col>\n\n          <!-- location pin display -->\n\n          <ion-col col-1>\n            <ion-icon name="pin" class="pin-icon"></ion-icon>\n          </ion-col>\n\n        </ion-row>\n      </ion-card-content>\n    </ion-card>\n  </ion-grid>\n\n  \n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Haircut/haircut-home/haircut-home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], HaircutHomePage);
    return HaircutHomePage;
}());

//# sourceMappingURL=haircut-home.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HaircutBookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__haircut_popup_haircut_popup__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_js_sha256__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_js_sha256___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_js_sha256__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__haircut_conformation_haircut_conformation__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Common_profile_profile__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Common_my_order_my_order__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the HaircutBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HaircutBookPage = /** @class */ (function () {
    function HaircutBookPage(navCtrl, navParams, popoverCtrl, fbService, afAuth, alertCtrl, modalCtrl, toastCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.fbService = fbService;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.selectedShop = this.navParams.get('data');
        this.timeSlots = this.navParams.get('data')['timeSlots'];
        this.rawTimeSlots = this.timeSlots;
        // get the current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        this.toDate = dd + '-' + this.convertMonth(mm) + '-' + yyyy;
        // get the current time
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var timeNow = h + ":" + m + ":" + '00';
        timeNow = "12:8:00";
        // filter the slots based on current time
        this.timeSlots = this.timeSlots.filter(function (element) {
            return (timeNow < _this.convertTime(element.time));
        });
    }
    HaircutBookPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HaircutBookPage');
    };
    HaircutBookPage.prototype.popup = function (times) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_2__haircut_popup_haircut_popup__["a" /* HaircutPopupPage */], { data: times });
        popover.onDidDismiss(function (data) {
            console.log(data);
            if (data != undefined) {
                _this.bookAppointment(data);
            }
        });
        popover.present();
    };
    // convert the month to it's key word
    HaircutBookPage.prototype.convertMonth = function (mm) {
        if (mm == 1) {
            return 'Jan';
        }
        else if (mm = 2) {
            return 'Feb';
        }
        else if (mm = 3) {
            return 'Mar';
        }
        else if (mm = 4) {
            return 'Apr';
        }
        else if (mm = 5) {
            return 'May';
        }
        else if (mm = 6) {
            return 'Jun';
        }
        else if (mm = 7) {
            return 'July';
        }
        else if (mm = 8) {
            return 'Aug';
        }
        else if (mm = 9) {
            return 'Sept';
        }
        else if (mm = 10) {
            return 'Oct';
        }
        else if (mm = 11) {
            return 'Nov';
        }
        else if (mm = 12) {
            return 'Dec';
        }
    };
    // time - 12hr to 24hr
    HaircutBookPage.prototype.convertTime = function (time) {
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM == "PM" && hours < 12)
            hours = hours + 12;
        if (AMPM == "AM" && hours == 12)
            hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10)
            sHours = "0" + sHours;
        if (minutes < 10)
            sMinutes = "0" + sMinutes;
        return (String(sHours + ":" + sMinutes + ":00"));
    };
    // book the seat 
    HaircutBookPage.prototype.bookAppointment = function (dataToBook) {
        var _this = this;
        // loading instance
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var dataToUpdate = this.rawTimeSlots.map(function (element) {
            if (element.time == dataToBook.time) {
                element.first = dataToBook.first;
                element.second = dataToBook.second;
                element.status = dataToBook.status;
            }
            return element;
        });
        // Update the data
        var path = 'haircut/shops/' + this.selectedShop.id + '/timeSlots';
        var data = (_a = {},
            _a[path] = dataToUpdate,
            _a);
        this.fbService.updateField(data)
            .then(function (response) {
            // appointmentId
            var d = new Date();
            var n = d.getMilliseconds();
            var appointmentId = 'MMN' + _this.selectedShop.id + 'U' + n +
                _this.afAuth.auth.currentUser.uid + dataToBook.time + _this.toDate;
            // Hash using sha256
            appointmentId = Object(__WEBPACK_IMPORTED_MODULE_5_js_sha256__["sha256"])(appointmentId);
            // data to update in request
            var dataToRequest = {
                'appointmentId': appointmentId,
                'cost': 0,
                'date': _this.toDate,
                'userId': _this.afAuth.auth.currentUser.uid,
                'seats': {
                    'first': dataToBook.first,
                    'second': dataToBook.second
                },
                'service': 'Haircut',
                'shopId': _this.selectedShop.id,
                'status': 0,
                'time': dataToBook.time,
                'transactionId': 0,
                'userName': '',
                'shopName': _this.selectedShop.shopName
            };
            // get the userName
            _this.fbService.readOnce('users/' + _this.afAuth.auth.currentUser.uid)
                .then(function (response) {
                dataToRequest.userName = response['name'];
                // update in request set
                _this.fbService.writeInDatabase('requests/' + appointmentId, dataToRequest)
                    .then(function (response) {
                    // dismiss loading
                    loading.dismiss();
                    var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__haircut_conformation_haircut_conformation__["a" /* HaircutConformationPage */], { payload: dataToRequest });
                    modal.present();
                })
                    .catch(function (error) {
                    // dismiss loading
                    loading.dismiss();
                    // alert message
                    var alert = _this.alertCtrl.create({
                        title: 'Failed',
                        message: 'Something seems to be wrong, please try again later',
                        buttons: [
                            {
                                text: 'Okay'
                            }
                        ]
                    });
                    alert.present();
                });
            })
                .catch(function (error) {
                // dismiss loading
                loading.dismiss();
                // alert message
                var alert = _this.alertCtrl.create({
                    title: 'Failed',
                    message: 'Something seems to be wrong, please try again later',
                    buttons: [
                        {
                            text: 'Okay'
                        }
                    ]
                });
                alert.present();
            });
        })
            .catch(function (error) {
            // dismiss loading
            loading.dismiss();
            // alert message
            var alert = _this.alertCtrl.create({
                title: 'Failed',
                message: 'Something seems to be wrong, please try again later',
                buttons: [
                    {
                        text: 'Okay'
                    }
                ]
            });
            alert.present();
        });
        var _a;
    };
    // nav to profile
    HaircutBookPage.prototype.navToProfile = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            duration: 2000,
            message: "Check your internet connection",
            position: 'bottom'
        });
        var user = this.afAuth.auth.currentUser;
        this.fbService.readOnce('users/' + user.uid)
            .then(function (response) {
            var details = Object.entries(response);
            var emailId = details[0][1];
            var phone = details[2][1];
            var fullName = details[1][1];
            var payload = {
                email: emailId,
                phoneNumber: phone,
                name: fullName
            };
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__Common_profile_profile__["a" /* ProfilePage */], { 'payload': payload });
        })
            .catch(function (error) {
            toast.present();
        });
    };
    // nav to my order page
    HaircutBookPage.prototype.navToMyOrders = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__Common_my_order_my_order__["a" /* MyOrderPage */]);
    };
    HaircutBookPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-haircut-book',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Haircut/haircut-book/haircut-book.html"*/'<!--\n  Generated template for the HaircutBookPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<!-- Header -->\n<ion-header>\n  <ion-navbar>\n    <ion-title class="toolbar-title.toolbar-title-md ">Book</ion-title>\n\n    <ion-buttons right class="Union" (click)="navToProfile()">\n      <button ion-button icon-only>\n        <ion-icon name="custom-Union" class="resize-icon"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-buttons right class="hammer" (click)="navToMyOrders()">\n      <button ion-button icon-only>\n        <ion-icon name="custom-hammer" class="resize-icon"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n<!-- content -->\n<ion-content padding>\n\n  <ion-grid>\n\n    <!-- image -->\n    <ion-row>\n      <ion-img src="assets/imgs/camera.jpg"></ion-img>\n    </ion-row>\n\n    <!-- Shop Details -->\n    <ion-row justify-content-center>\n      <div text-center>\n        <p class="shopName"><b>{{ selectedShop.shopName }}</b></p>\n        <p class="shopDetails">{{ toDate }}</p>\n      </div>\n    </ion-row>\n    <ion-row>\n      <p class="time"><b>Time</b></p>\n    </ion-row>\n\n    <!-- Timings -->\n    <ion-row>\n\n      <ion-col col-4 *ngFor="let times of timeSlots" (click)="popup(times)">\n        <div [ngClass]="[times.status == 0?\'green\':\'\', times.status == 1?\'yellow\':\'\', times.status == 2?\'red\':\'\']"\n          class="roundedCorners" >\n          <p class="textSize">{{ times.time }}</p>\n          <ion-row justify-content-center>\n            <ion-col col-5>\n              <ion-icon name="custom-gnSeat" [ngClass]="[times.first?\'greyIcon\':\'greenIcon\']"></ion-icon>\n            </ion-col>\n            <ion-col col-5>\n              <ion-icon name="custom-gnSeat" [ngClass]="[times.second?\'greyIcon\':\'greenIcon\']"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </div>\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Haircut/haircut-book/haircut-book.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_3__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], HaircutBookPage);
    return HaircutBookPage;
}());

//# sourceMappingURL=haircut-book.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HaircutPopupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the HaircutPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HaircutPopupPage = /** @class */ (function () {
    function HaircutPopupPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        // Flags for color change in seat icons
        this.firstSeatFlag = 0;
        this.secondSeatFlag = 0;
        this.timeSlot = this.navParams.get('data');
        console.log(this.timeSlot);
        if (this.timeSlot.first == 1) {
            this.firstSeatFlag = 3;
            document.documentElement.style.setProperty("--seat-color-first", '#adadad');
        }
        else {
            this.firstSeatFlag = 0;
            document.documentElement.style.setProperty("--seat-color-first", '#808080');
        }
        if (this.timeSlot.second == 1) {
            this.secondSeatFlag = 3;
            document.documentElement.style.setProperty("--seat-color-second", '#adadad');
        }
        else {
            this.secondSeatFlag = 0;
            document.documentElement.style.setProperty("--seat-color-second", '#808080');
        }
    }
    HaircutPopupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HaircutPopupPage');
    };
    // first seat
    HaircutPopupPage.prototype.firstSeat = function () {
        if (this.firstSeatFlag == 0) {
            document.documentElement.style.setProperty("--seat-color-first", '#35AE59');
            this.firstSeatFlag = 1;
        }
        else if (this.firstSeatFlag == 1) {
            document.documentElement.style.setProperty("--seat-color-first", '#808080');
            this.firstSeatFlag = 0;
        }
    };
    // second seat
    HaircutPopupPage.prototype.secondSeat = function () {
        if (this.secondSeatFlag == 0) {
            document.documentElement.style.setProperty("--seat-color-second", '#35AE59');
            this.secondSeatFlag = 1;
        }
        else if (this.secondSeatFlag == 1) {
            document.documentElement.style.setProperty("--seat-color-second", '#808080');
            this.secondSeatFlag = 0;
        }
    };
    // Cancel clicked
    HaircutPopupPage.prototype.cancelled = function () {
        this.viewCtrl.dismiss();
    };
    // Ok clicked
    HaircutPopupPage.prototype.conformed = function () {
        // Seat chosed update
        if (this.firstSeatFlag == 0 || this.firstSeatFlag == 1) {
            this.timeSlot.first = this.firstSeatFlag;
        }
        if (this.secondSeatFlag == 0 || this.secondSeatFlag == 1) {
            this.timeSlot.second = this.secondSeatFlag;
        }
        // Status update
        if ((this.firstSeatFlag == 1 && this.secondSeatFlag == 1) || (this.firstSeatFlag == 3 && this.secondSeatFlag == 3) || (this.firstSeatFlag == 1 && this.secondSeatFlag == 3) || this.firstSeatFlag == 3 && this.secondSeatFlag == 1) {
            this.timeSlot.status = 2;
        }
        else if (this.firstSeatFlag == 1 || this.secondSeatFlag == 1) {
            this.timeSlot.status = 1;
        }
        else {
            this.timeSlot.status = 0;
        }
        if (this.firstSeatFlag != 0 || this.secondSeatFlag != 0) {
            this.viewCtrl.dismiss(this.timeSlot);
        }
        else {
            this.viewCtrl.dismiss();
        }
    };
    HaircutPopupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-haircut-popup',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Haircut/haircut-popup/haircut-popup.html"*/'<ion-content padding>\n\n    <ion-grid class="con-grid">\n\n        <!-- 3rows (2rows for text and 1row with 2col for seatIcon) -->\n        <!-- row1 -->\n        <ion-row justify-content-center>\n          <h1>Select Seat</h1>\n        </ion-row>\n        <!-- row2 -->\n        <ion-row justify-content-center>\n          <p>{{ timeSlot.time }}</p>\n        </ion-row>\n        <!-- row3 -->\n        <ion-row justify-content-center class="seatCenter">\n          <ion-col col-6 (click)="firstSeat()">\n              <ion-icon name="custom-gnSeat" class="firstIcon"></ion-icon>\n          </ion-col>\n          <ion-col col-6 (click)="secondSeat()">\n              <ion-icon  name="custom-gnSeat" class="secondIcon"></ion-icon>\n          </ion-col>\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>\n\n\n\n\n<!-- footer for cancel and ok -->\n<ion-footer no-border class="center" >\n\n    <!-- grid with 1row and 2col -->\n    <ion-grid class="footer-grid">\n\n        <!-- 1row with 2col for confirmation -->\n        <ion-row class = "borderTop">\n            <ion-col col-6 class="borderRight" (click)="cancelled()">\n              <ion-label  class="red">Cancel</ion-label>\n            </ion-col>\n            <ion-col (click)="conformed()">\n              <ion-label class="green">Ok</ion-label>\n            </ion-col>\n        </ion-row>\n\n    </ion-grid>\n\n</ion-footer>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Haircut/haircut-popup/haircut-popup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], HaircutPopupPage);
    return HaircutPopupPage;
}());

//# sourceMappingURL=haircut-popup.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HaircutConformationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Common_my_order_my_order__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the HaircutConformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HaircutConformationPage = /** @class */ (function () {
    function HaircutConformationPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        // get the details from the source page
        this.bookedDetails = this.navParams.get('payload');
        // Updating the number of seats count
        if (this.bookedDetails.seats['first'] == 1 && this.bookedDetails.seats['second'] == 1) {
            this.numberOfSeats = 2;
        }
        else {
            this.numberOfSeats = 1;
        }
    }
    HaircutConformationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HaircutConformationPage');
    };
    // dismiss the view
    HaircutConformationPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    // nav to my orders
    HaircutConformationPage.prototype.navToMyOrders = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__Common_my_order_my_order__["a" /* MyOrderPage */]);
    };
    HaircutConformationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-haircut-conformation',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Haircut/haircut-conformation/haircut-conformation.html"*/'<!--\n  Generated template for the HaircutConformationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <!-- <ion-navbar class="toolbar-background">\n   \n  </ion-navbar> -->\n  <ion-toolbar>\n    <ion-title class="toolbar-title.toolbar-title-md">Order Confirmation</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n  <ion-grid>\n\n    <!-- row1 for shop name and has 3cols -->\n    <ion-row>\n      <ion-col col-5>\n        <b class="marginLeft-45">Shop Name</b>\n      </ion-col>\n      <ion-col col-1>\n        <b class="marginLeft-colon">:</b>\n      </ion-col>\n      <ion-col col-6>\n        <div class="marginLeft-light">{{ bookedDetails.shopName }}</div>\n      </ion-col>\n    </ion-row>\n\n    <!-- row2 for date name and has 3cols -->\n    <ion-row>\n      <ion-col col-5>\n        <b class="marginLeft-45">Date</b>\n      </ion-col>\n      <ion-col col-1>\n        <b class="marginLeft-colon">:</b>\n      </ion-col>\n      <ion-col col-6>\n        <div class="marginLeft-light">{{ bookedDetails.date }}</div>\n      </ion-col>\n    </ion-row>\n\n    <!-- row3 for Time and has 3cols -->\n    <ion-row>\n      <ion-col col-5>\n        <b class="marginLeft-45">Time</b>\n      </ion-col>\n      <ion-col col-1>\n        <b class="marginLeft-colon">:</b>\n      </ion-col>\n      <ion-col col-6>\n        <div class="marginLeft-light">{{ bookedDetails.time }}</div>\n      </ion-col>\n    </ion-row>\n\n    <!-- row4 for SeatNum and has 3cols -->\n    <ion-row>\n      <ion-col col-5>\n        <b class="marginLeft-45">No. of Seats</b>\n      </ion-col>\n      <ion-col col-1>\n        <b class="marginLeft-colon">:</b>\n      </ion-col>\n      <ion-col col-6>\n        <div class="marginLeft-light">{{ numberOfSeats }}</div>\n\n      </ion-col>\n    </ion-row>\n\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer no-border>\n\n  <!-- card to navigate history page -->\n  <div text-center>\n    <ion-card (click)="navToMyOrders()">\n      <p class="reduceTop">No cancellation allowed</p>\n      <p class="reduceTop1">Click to see order history</p>\n    </ion-card>\n  </div>\n\n</ion-footer>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Haircut/haircut-conformation/haircut-conformation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], HaircutConformationPage);
    return HaircutConformationPage;
}());

//# sourceMappingURL=haircut-conformation.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(317);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_Common_home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_Common_signup_signup__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_Common_login_login__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_Photography_photography_photography__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_Photography_book_book__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_Common_my_order_my_order__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_Photography_order_booked_order_booked__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_Common_orderbooked2_orderbooked2__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_Common_profile_profile__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_Haircut_haircut_conformation_haircut_conformation__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_Haircut_haircut_book_haircut_book__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_Haircut_haircut_home_haircut_home__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_Haircut_haircut_popup_haircut_popup__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_fireBaseService__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angularfire2_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_angularfire2_database__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__credentials_firebase_credential__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_myManService__ = __webpack_require__(292);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















// Firebase Services

// Angularfire2 for firebase functions



// firebase credentials

// myman service

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_Common_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_Common_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_Common_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_Photography_photography_photography__["a" /* PhotographyPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_Photography_book_book__["a" /* BookPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_Common_my_order_my_order__["a" /* MyOrderPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_Photography_order_booked_order_booked__["a" /* OrderBookedPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_Common_orderbooked2_orderbooked2__["a" /* Orderbooked2Page */],
                __WEBPACK_IMPORTED_MODULE_14__pages_Common_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_Haircut_haircut_home_haircut_home__["a" /* HaircutHomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_Haircut_haircut_book_haircut_book__["a" /* HaircutBookPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_Haircut_haircut_conformation_haircut_conformation__["a" /* HaircutConformationPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_Haircut_haircut_popup_haircut_popup__["a" /* HaircutPopupPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_20_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_23__credentials_firebase_credential__["a" /* firebaseConfig */].config)
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_Common_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_Common_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_Common_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_Photography_photography_photography__["a" /* PhotographyPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_Photography_book_book__["a" /* BookPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_Common_my_order_my_order__["a" /* MyOrderPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_Photography_order_booked_order_booked__["a" /* OrderBookedPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_Common_orderbooked2_orderbooked2__["a" /* Orderbooked2Page */],
                __WEBPACK_IMPORTED_MODULE_14__pages_Common_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_Haircut_haircut_home_haircut_home__["a" /* HaircutHomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_Haircut_haircut_book_haircut_book__["a" /* HaircutBookPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_Haircut_haircut_conformation_haircut_conformation__["a" /* HaircutConformationPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_Haircut_haircut_popup_haircut_popup__["a" /* HaircutPopupPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_19__services_fireBaseService__["a" /* FirebaseServices */],
                __WEBPACK_IMPORTED_MODULE_21_angularfire2_auth__["a" /* AngularFireAuth */],
                __WEBPACK_IMPORTED_MODULE_22_angularfire2_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_24__services_myManService__["a" /* MyManService */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__orderbooked2_orderbooked2__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyOrderPage = /** @class */ (function () {
    function MyOrderPage(navCtrl, navParams, fbService, afAuth, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fbService = fbService;
        this.afAuth = afAuth;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        // seperated orders list
        this.photographyOrders = [];
        this.haircutOrders = [];
        // flags for user display
        this.haircutFlag = false;
        this.photographyFlag = false;
        // Raw Requests
        this.rawPhotographyOrders = [];
        this.rawHaircutOrders = [];
        // Expanded flags
        this.haircutExpanded = false;
        this.photographyExpanded = false;
        var user = this.afAuth.auth.currentUser;
        var loading = this.loadingCtrl.create({
            content: 'please wait'
        });
        loading.present();
        this.fbService.filterData(this.fbService.equalTo, 'requests', null, this.fbService.orderByChild, 'userId', user.uid)
            .then(function (response) {
            loading.dismiss();
            var obj = Object.entries(response);
            // arrays for seperated services
            var haircut = Array();
            var photography = Array();
            obj.forEach(function (element) {
                // Check the service
                if (element[1]['service'] == 'Haircut') {
                    haircut.push(element[1]);
                }
                else if (element[1]['service'] == 'Photography') {
                    photography.push(element[1]);
                }
            });
            // Presence of haircut orders
            if (haircut.length == 0) {
                _this.haircutFlag = true;
            }
            else {
                _this.rawHaircutOrders = haircut;
            }
            // Presence if photography orders
            if (photography.length == 0) {
                _this.photographyFlag = true;
            }
            else {
                _this.rawPhotographyOrders = photography;
            }
            _this.limitRequests();
        });
    }
    MyOrderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyOrderPage');
    };
    // Nav to profile page
    MyOrderPage.prototype.clicked = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            duration: 2000,
            message: "Check your internet connection",
            position: 'bottom'
        });
        var user = this.afAuth.auth.currentUser;
        this.fbService.readOnce('users/' + user.uid)
            .then(function (response) {
            var details = Object.entries(response);
            var emailId = details[0][1];
            var phone = details[2][1];
            var fullName = details[1][1];
            var payload = {
                email: emailId,
                phoneNumber: phone,
                name: fullName
            };
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */], { 'payload': payload });
        })
            .catch(function (error) {
            toast.present();
        });
    };
    // Request clicked
    MyOrderPage.prototype.cardclick = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__orderbooked2_orderbooked2__["a" /* Orderbooked2Page */], { 'payload': item });
    };
    // expand & shrink requests
    MyOrderPage.prototype.alterView = function (service, flag) {
        // check the service
        if (service == 'haircut') {
            this.haircutExpanded = flag;
        }
        else if (service == 'photography') {
            this.photographyExpanded = flag;
        }
        this.limitRequests();
    };
    MyOrderPage.prototype.limitRequests = function () {
        // check the expanded flag and assign the array of requests
        if (this.haircutExpanded) {
            this.haircutOrders = this.rawHaircutOrders;
        }
        else {
            this.haircutOrders = this.rawHaircutOrders.slice(0, 3);
        }
        if (this.photographyExpanded) {
            this.photographyOrders = this.rawPhotographyOrders;
        }
        else {
            this.photographyOrders = this.rawPhotographyOrders.slice(0, 3);
        }
    };
    MyOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-order',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/my-order/my-order.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title class="toolbar-title.toolbar-title-md">My Order</ion-title>\n    <ion-buttons right class="paddingright">\n      <button ion-button icon-only (click)="clicked()">\n        <ion-icon name="person" class="ion-md-person"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <h1>Photography</h1>\n  <p *ngIf="photographyFlag" class="alert">Sorry, No orders found for Photography..!</p>\n  <div *ngIf="!photographyFlag" >\n    <ion-card *ngFor="let request of photographyOrders" (click)="cardclick(request)">\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="../../assets/imgs/camera1.jpg">\n        </ion-avatar>\n\n        <h2>Pack {{ request.pack.id }}</h2>\n        <p>Ordered : {{ request.bookedDate }}</p>\n        <p>Function : {{ request.fromDate }}</p>\n      </ion-item>\n    </ion-card>\n\n    <div text-center id="expand-flag" (click)="alterView(\'photography\', true)" *ngIf="!photographyExpanded">\n      <ion-label>Show more</ion-label>\n    </div>\n\n    <div text-center id="expand-flag" (click)="alterView(\'photography\', false)" *ngIf="photographyExpanded">\n      <ion-label>Show less</ion-label>\n    </div>\n  </div>\n\n  <h1>Haircut</h1>\n  <p *ngIf="haircutFlag" class="alert">Sorry, No orders found for Haircut..!</p>\n  <div *ngIf="!haircutFlag" class="parent">\n    <ion-card *ngFor="let request of haircutOrders" (click)="cardclick(request)">\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="../../assets/imgs/camera1.jpg">\n        </ion-avatar>\n\n        <h2>Shop Name: {{ request.shopName }}</h2>\n        <p>Date : {{ request.date }}</p> \n        <p>Time : {{ request.time }}</p>\n        <p *ngIf="request.seats.first == 1 && request.seats.second == 1">Seat No: 1, 2</p>\n        <p *ngIf="(request.seats.first == 0 && request.seats.second == 1)">Seat No: 2</p>\n        <p *ngIf="(request.seats.first == 1 && request.seats.second == 0)">Seat No: 1</p>\n      </ion-item>\n    </ion-card>\n\n    <div text-center id="expand-flag" (click)="alterView(\'haircut\', true)" *ngIf="!haircutExpanded">\n      <ion-label>Show more</ion-label>\n    </div>\n\n    <div text-center id="expand-flag" (click)="alterView(\'haircut\', false)" *ngIf="haircutExpanded">\n      <ion-label>Show less</ion-label>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/my-order/my-order.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], MyOrderPage);
    return MyOrderPage;
}());

//# sourceMappingURL=my-order.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_Common_login_login__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_Common_home_home__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, angularFire, af, alertCtrl) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.angularFire = angularFire;
        this.af = af;
        this.alertCtrl = alertCtrl;
        this.initialiseApp();
    }
    MyApp.prototype.initialiseApp = function () {
        var _this = this;
        this.pages = [
            { title: '', component: '' },
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_Common_login_login__["a" /* LoginPage */] },
        ];
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // check if the user is signed in
            _this.angularFire.authState.subscribe(function (user) {
                _this.rootPage = user ? __WEBPACK_IMPORTED_MODULE_5__pages_Common_home_home__["a" /* HomePage */] : __WEBPACK_IMPORTED_MODULE_4__pages_Common_login_login__["a" /* LoginPage */];
            });
        });
        this.statusBar.styleBlackOpaque();
        this.splashScreen.hide();
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logout = function () {
        // logout the user and navigate to Login page
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Oops..!',
            message: 'Do you want to logout?',
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        _this.angularFire.auth.signOut();
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_Common_login_login__["a" /* LoginPage */]);
                    }
                },
                {
                    text: 'No',
                    handler: function () {
                        //
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/app/app.html"*/'<ion-menu [content]="content">\n\n    <ion-toolbar>\n      <ion-title>MyMan</ion-title>\n    </ion-toolbar>\n  \n    <ion-content>\n      <ion-list>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n          {{ p.title }}\n        </button>\n\n        <button  ion-button  round full menuClose\n                  class="button-logout" \n                  (click)="logout()">\n                  Logout\n        </button>\n\n      </ion-list>\n    </ion-content>\n  \n  </ion-menu>\n  \n  <ion-nav id="nav" [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2__["a" /* AngularFireModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = MustMatch;
// custom validator to check that two fields match
function MustMatch(controlName, matchingControlName) {
    return function (formGroup) {
        var control = formGroup.controls[controlName];
        var matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        }
        else {
            matchingControl.setErrors(null);
        }
    };
}
//# sourceMappingURL=must-match.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
// credential for firebase project
var firebaseConfig = {
    config: {
        apiKey: "AIzaSyDO7w2BSyaeqHISmXz7A5Vc_hMs_SPUQzs",
        authDomain: "myman180.firebaseapp.com",
        databaseURL: "https://myman180.firebaseio.com",
        projectId: "myman180",
        storageBucket: "",
        messagingSenderId: "60171985623",
        appId: "1:60171985623:web:6a3661263e11b72fefc692"
    }
};
//# sourceMappingURL=firebase-credential.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_order_my_order__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__orderbooked2_orderbooked2__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_fireBaseService__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, afAuth, fbService, formBuilder, toastCtrl, alertCtrl, afApp) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.fbService = fbService;
        this.formBuilder = formBuilder;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.afApp = afApp;
        // flag for edit status
        this.editStatus = 0;
        this.editFormIcon = false;
        // Requests flag
        this.requestFlag = true;
        this.editForm = this.formBuilder.group({
            phoneNumber: [this.navParams.get('payload').phoneNumber, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].pattern('^[0-9]+$'),
                    __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].maxLength(10)
                ])],
            email: [this.navParams.get('payload').email, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$'),
                    __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].required
                ])],
            name: [this.navParams.get('payload').name, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].minLength(4)
                ])]
        });
        this.fbService.filterData(this.fbService.equalTo, 'requests', null, this.fbService.orderByChild, 'userId', this.navParams.get('payload').uid)
            .then(function (response) {
            var result = Object.entries(response);
            // append items to array
            _this.latestReq = result[result.length - 1][1];
            _this.service = _this.latestReq['service'];
            _this.bookedDate = _this.latestReq['date'];
        })
            .catch(function (error) {
            // If no requests found, set request flag to false
            _this.requestFlag = false;
            console.log(_this.requestFlag);
        });
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.order = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__my_order_my_order__["a" /* MyOrderPage */]);
    };
    ProfilePage.prototype.cardclick = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__orderbooked2_orderbooked2__["a" /* Orderbooked2Page */], { 'payload': this.latestReq });
    };
    // update checkmark icon status
    ProfilePage.prototype.editIconUpdate = function () {
        var _this = this;
        setTimeout(function () {
            _this.editFormIcon = _this.editForm.valid;
        }, 10);
    };
    //maintain the edit and view state
    ProfilePage.prototype.editFired = function (status) {
        var _this = this;
        this.editStatus = status;
        this.editFormIcon = this.editForm.valid;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log(_this.afAuth.auth.currentUser['email']);
                        _this.fbService.login(_this.afAuth.auth.currentUser['email'], data.password)
                            .then(function (response) {
                            // Updating the edited details
                            var email = 'users/' + (_this.afAuth.auth.currentUser.uid) + '/email';
                            var phoneNumber = 'users/' + (_this.afAuth.auth.currentUser.uid) + '/phoneNumber';
                            var name = 'users/' + (_this.afAuth.auth.currentUser.uid) + '/name';
                            var data = {};
                            _this.afAuth.auth.currentUser.updateEmail(_this.editForm.controls['email'].value);
                            data[email] = _this.editForm.controls['email'].value;
                            data[phoneNumber] = _this.editForm.controls['phoneNumber'].value;
                            data[name] = _this.editForm.controls['name'].value;
                            // updating in database
                            _this.fbService.updateField(data);
                            document.documentElement.style.setProperty("--teal", '#18A0A0');
                            document.documentElement.style.setProperty("--header-profile", '20%');
                            var alert = _this.alertCtrl.create({
                                message: 'Hurray..! The profile details are updated'
                            });
                            alert.present();
                        })
                            .catch(function (error) {
                            // displaying error toast
                            var alert = _this.alertCtrl.create({
                                message: 'Password is incorrect. Please enter the correct password'
                            });
                            alert.present();
                            document.documentElement.style.setProperty("--teal", '#18A0A0');
                            document.documentElement.style.setProperty("--header-profile", '20%');
                        });
                    }
                }
            ]
        });
        if (status == 1) {
            document.documentElement.style.setProperty("--teal", 'red');
            document.documentElement.style.setProperty("--header-profile", '0%');
        }
        else {
            var email = this.editForm.controls['email'].value;
            var name_1 = this.editForm.controls['name'].value;
            var phoneNumber = this.editForm.controls['phoneNumber'].value;
            if (email != this.navParams.get('payload').email ||
                name_1 != this.navParams.get('payload').name ||
                phoneNumber != this.navParams.get('payload').phoneNumber) {
                prompt.present();
            }
            else {
                // Toast for notifying user about the unedited details
                var toast = this.toastCtrl.create({
                    message: 'Seems like you didn\'t changed anything',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                document.documentElement.style.setProperty("--teal", '#18A0A0');
                document.documentElement.style.setProperty("--header-profile", '20%');
            }
        }
    };
    // Change Password
    ProfilePage.prototype.changePassword = function () {
        var _this = this;
        var alertPrompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        // Local scoped user crdentials
                        var user = _this.afAuth.auth.currentUser;
                        // Reauthenticate to check if the old 
                        // password entered is correct.
                        _this.fbService.login(user['email'], data.oldPassword)
                            .then(function (response) {
                            //update password if login is successful
                            //checking new password characters length for 6
                            if (data.newPassword.length >= 6) {
                                user.updatePassword(data.newPassword)
                                    .then(function (response) {
                                    // Display the alert message
                                    var alert = _this.alertCtrl.create({
                                        title: 'Updated',
                                        message: 'Password updated successfully...!'
                                    });
                                    alert.present();
                                })
                                    .catch(function (error) {
                                    // Display the alert message
                                    var alert = this.alertCtrl.create({
                                        title: 'Failed',
                                        message: 'Some problem occured...Please try again later...!'
                                    });
                                    alert.present();
                                });
                            }
                            else {
                                // Display the alert message
                                var alert_1 = _this.alertCtrl.create({
                                    title: 'Failed',
                                    message: 'Password should be minimum of 6 characters'
                                });
                                alert_1.present();
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            // Display the alert message
                            var alert = _this.alertCtrl.create({
                                title: 'Failed',
                                message: 'Enter the correct old password'
                            });
                            alert.present();
                        });
                    }
                },
                {
                    text: 'cancel',
                    handler: function (data) {
                    }
                }
            ]
        });
        alertPrompt.present();
    };
    // delete the user 
    ProfilePage.prototype.deleteUser = function () {
        var _this = this;
        // user & uid
        var user = this.afAuth.auth.currentUser;
        var alert = this.alertCtrl.create({
            title: 'Conformation',
            message: 'Enter your password to delete the account',
            inputs: [
                {
                    name: 'password',
                    placeholder: 'placeholder'
                }
            ],
            buttons: [
                {
                    text: 'Delete',
                    handler: function (data) {
                        // check the user password
                        _this.fbService.login(user['email'], data.password)
                            .then(function (response) {
                            // delete the user 
                            user.delete()
                                .then(function (response) {
                                // display alert message
                                var resultAlert = _this.alertCtrl.create({
                                    title: 'Account deleted',
                                    message: 'Your account has been deleted successfully..! We miss you..!'
                                });
                                resultAlert.present();
                                // logout from the app
                                _this.afAuth.auth.signOut();
                            })
                                .catch(function (error) {
                                // display alert message
                                var resultAlert = _this.alertCtrl.create({
                                    title: 'Error',
                                    message: 'Something is wrong, please try again later'
                                });
                                resultAlert.present();
                            });
                        })
                            .catch(function (error) {
                            // display alert message
                            var resultAlert = _this.alertCtrl.create({
                                title: 'Error',
                                message: 'Enter the correct password'
                            });
                            resultAlert.present();
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/profile/profile.html"*/'<ion-header>\n  <ion-navbar class="toolbar-background" hideBackButton>\n    <ion-title class="toolbar-title.toolbar-title-md">Profile</ion-title>\n\n    <ion-buttons left>\n      <button ion-button icon-only (click)="navCtrl.pop()" class="back-btn">\n        <ion-icon name="arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-buttons right class="hammer" *ngIf="editStatus == 0">\n      <button ion-button icon-only (click)="order()">\n        <ion-icon name="custom-hammer" class="resize-icon"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-buttons right class="Del" *ngIf="editStatus == 0">\n      <button ion-button icon-only (click)="deleteUser()">\n        <ion-icon name="trash"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-buttons right class="Del" *ngIf="editStatus == 1">\n      <button ion-button icon-only (click)="editFired(0)" [disabled]="!editFormIcon">\n        <ion-icon name="checkmark"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-buttons right class="Del" *ngIf="editStatus == 0">\n      <button ion-button icon-only (click)="editFired(1)">\n        <ion-icon name="create"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <form [formGroup]="editForm">\n    <ion-grid>\n\n      <ion-row>\n        <ion-col col-12 class="l1"><b>Name</b></ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-item class="round-border">\n            <ion-input type="text" formControlName="name" (ngModelChange)="editIconUpdate()" placeholder="Name"\n              [disabled]="editStatus == 0"></ion-input>\n          </ion-item>\n\n          <ion-item class="warning-on-input"\n            *ngIf="!editForm.controls.name.valid  && (editForm.controls.name.dirty || submitAttempt)">\n            <p>Please enter your full name</p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-12 class="l1"><b>Phone Number</b></ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-item class="round-border">\n            <ion-input type="text" formControlName="phoneNumber" (ngModelChange)="editIconUpdate()"\n              placeholder=\'Phone Number\' [disabled]="editStatus == 0"></ion-input>\n          </ion-item>\n\n          <ion-item class="warning-on-input"\n            *ngIf="!editForm.controls.phoneNumber.valid  && (editForm.controls.phoneNumber.dirty || submitAttempt)">\n            <p>Please enter a valid Phone Number</p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-12 class="l1"><b>Mail</b></ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-item class="round-border">\n            <ion-input type="text" formControlName="email" (ngModelChange)="editIconUpdate()" placeholder="Mail"\n              [disabled]="editStatus == 0"></ion-input>\n          </ion-item>\n\n          <ion-item class="warning-on-input"\n            *ngIf="!editForm.controls.email.valid  && (editForm.controls.email.dirty || submitAttempt)">\n            <p>Please enter a valid Email</p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n\n      <ion-row>\n        <ion-col col-12 class="l1"><b>Recent Orders</b></ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-card (click)="cardclick()" *ngIf="requestFlag">\n            <ion-item>\n              <ion-avatar item-start>\n                <img src="../../assets/imgs/camera1.jpg">\n              </ion-avatar>\n              <h2>Service: {{ service }}</h2>\n              <p>Ordered : {{ bookedDate }}</p>\n            </ion-item>\n          </ion-card>\n\n          <ion-card *ngIf="!requestFlag">\n            <ion-item>\n              <ion-avatar item-start>\n                <img src="../../assets/imgs/camera1.jpg">\n              </ion-avatar>\n              <h2>No Bookings found..!</h2>\n              <p>Please book your first <br>Appointment</p>\n            </ion-item>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n\n\n    <ion-buttons type="password" (click)="changePassword()">\n      <button ion-button round full class="button" [disabled]="editStatus == 0">Change Password</button>\n    </ion-buttons>\n\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/ghost/My_works/Ionic/MyMan/src/pages/Common/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5__services_fireBaseService__["a" /* FirebaseServices */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

},[297]);
//# sourceMappingURL=main.js.map