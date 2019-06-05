(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _myheader_myheader_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../myheader/myheader.component */ "./src/app/myheader/myheader.component.ts");








var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                    }
                ])
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"], _myheader_myheader_component__WEBPACK_IMPORTED_MODULE_7__["MyheaderComponent"]],
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.html":
/*!*************************************!*\
  !*** ./src/app/home/home.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-myheader></app-myheader>\n<ion-content>\n  <div class=\"ion-padding\">\n      <br>\n    <strong>SupBank </strong>is an online European banking company focused on deposit accounts,<br>\n    overdraft, credit and investment products. As with all existing banks. <br> <br>\n    SupBank faces the limitations of the international SWIFT and SEPA payment <br>\n    systems for international and European transfers. <br> <br>\n    SupBank has decided to create its own system for storing and transmitting <br>\n    banking transaction information. This new system will have the following features: <br>\n    <ul>\n     <li>Instant (nearly) wires </li><br>\n     <li>Fee-less foreign exchange </li>\n      <br>\n     <li>Decentralized </li>\n      <br>\n     <li>Tamper-proof and secure </li>\n      <br>\n     <li>Seamless transition for users </li>\n      <br>\n    <li>Full transaction history</li>\n      <br>\n    </ul>\n  </div>\n</ion-content>\n\n\n\n"

/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");



var HomePage = /** @class */ (function () {
    function HomePage(appcomponent) {
        this.appcomponent = appcomponent;
        appcomponent.path = 'home';
    }
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]])
    ], HomePage);
    return HomePage;
}());



/***/ }),

/***/ "./src/app/myheader/myheader.component.html":
/*!**************************************************!*\
  !*** ./src/app/myheader/myheader.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n\n    <ion-title >\n      <span class=\"myHelloHeader\"> Welcome {{name}}</span>\n      <ion-button color=\"danger\" (click)=\"logout()\" style=\"float:right\"><ion-icon name=\"log-out\"  ></ion-icon></ion-button>\n    </ion-title>\n\n  </ion-toolbar>\n</ion-header>\n\n"

/***/ }),

/***/ "./src/app/myheader/myheader.component.scss":
/*!**************************************************!*\
  !*** ./src/app/myheader/myheader.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL215aGVhZGVyL215aGVhZGVyLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/myheader/myheader.component.ts":
/*!************************************************!*\
  !*** ./src/app/myheader/myheader.component.ts ***!
  \************************************************/
/*! exports provided: MyheaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyheaderComponent", function() { return MyheaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _login_shared_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../login/shared/login.service */ "./src/app/login/shared/login.service.ts");



var MyheaderComponent = /** @class */ (function () {
    function MyheaderComponent(loginService) {
        this.loginService = loginService;
        this.name = JSON.parse(localStorage.getItem('currentUser')).name;
    }
    MyheaderComponent.prototype.logout = function () {
        this.loginService.logout();
    };
    MyheaderComponent.prototype.ngOnInit = function () {
    };
    MyheaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-myheader',
            template: __webpack_require__(/*! ./myheader.component.html */ "./src/app/myheader/myheader.component.html"),
            styles: [__webpack_require__(/*! ./myheader.component.scss */ "./src/app/myheader/myheader.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_login_shared_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"]])
    ], MyheaderComponent);
    return MyheaderComponent;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map