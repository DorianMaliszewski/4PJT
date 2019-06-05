(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/login/login.page.ts");







var routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]
    }
];
var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



/***/ }),

/***/ "./src/app/login/login.page.html":
/*!***************************************!*\
  !*** ./src/app/login/login.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title text-center color=\"white\">My Blockchain App</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content text-center >\n  <br><br>\n  <ion-card class=\"login-content\">\n\n    <img src=\"../../../assets/images/Blockchain_Logo.jpg\" class=\"info-img\"/>\n    <ion-card-header >\n      <ion-card-title >Authentication</ion-card-title>\n    </ion-card-header>\n    <ion-card-content >\n\n      <ion-list>\n        <!--<div class=\"col-10\" *ngIf=\"incorrectPassword\">-->\n          <!--<ion-text color=\"danger\">Please enter a valid Password</ion-text>-->\n        <!--</div>-->\n        <!--<div class=\"col-10\" *ngIf=\"NoExistinguser\">-->\n          <!--<ion-text color=\"danger\">No existing user with these credentials ! </ion-text>-->\n        <!--</div>-->\n        <ion-item>\n          <strong><ion-label floating>Username</ion-label> </strong>\n          <ion-input type=\"text\" [(ngModel)]=\"username\" ></ion-input>\n        </ion-item>\n        <br>\n        <ion-item>\n          <strong><ion-label floating [(ngModel)]=\"password\">Password</ion-label> </strong>\n          <ion-input type=\"password\" value=\"\" ></ion-input>\n        </ion-item>\n        <br>\n        <ion-button shape=\"round\" expand=\"full\" color=\"success\" (click)=\"onSubmitForm()\">Sign In</ion-button>\n        <ion-button shape=\"round\" expand=\"full\" color=\"primary\" (click)=\"socialSignIn('facebook')\">Sign In with Facebook</ion-button>\n        <ion-button shape=\"round\" expand=\"full\" color=\"google\" (click)=\"socialSignIn('google')\">Sign in with Google</ion-button>\n        <!--<ion-button shape=\"round\" expand=\"full\" (click)=\"signUp()\">Sign Up</ion-button>-->\n      </ion-list>\n\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n\n"

/***/ }),

/***/ "./src/app/login/login.page.scss":
/*!***************************************!*\
  !*** ./src/app/login/login.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/login/login.page.ts":
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/login.service */ "./src/app/login/shared/login.service.ts");
/* harmony import */ var angular_6_social_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-6-social-login */ "./node_modules/angular-6-social-login/angular-6-social-login.umd.js");
/* harmony import */ var angular_6_social_login__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular_6_social_login__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var LoginPage = /** @class */ (function () {
    function LoginPage(loginService, socialAuthService, router) {
        this.loginService = loginService;
        this.socialAuthService = socialAuthService;
        this.router = router;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.onSubmitForm = function () {
        this.loginService.login(this.username, this.password);
    };
    LoginPage.prototype.socialSignIn = function (socialPlatform) {
        var _this = this;
        var socialPlatformProvider;
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = angular_6_social_login__WEBPACK_IMPORTED_MODULE_3__["FacebookLoginProvider"].PROVIDER_ID;
        }
        else if (socialPlatform === 'google') {
            socialPlatformProvider = angular_6_social_login__WEBPACK_IMPORTED_MODULE_3__["GoogleLoginProvider"].PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(function (userData) {
            console.log(socialPlatform + ' sign in data : ', userData);
            _this.loginService.saveToken(userData.token, userData.name);
            _this.router.navigate(['/home']);
        }, function (err) { return console.log('erreur :' + err); });
    };
    LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.page.html */ "./src/app/login/login.page.html"),
            styles: [__webpack_require__(/*! ./login.page.scss */ "./src/app/login/login.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"],
            angular_6_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map