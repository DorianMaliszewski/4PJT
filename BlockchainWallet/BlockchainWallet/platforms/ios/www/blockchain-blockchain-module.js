(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["blockchain-blockchain-module"],{

/***/ "./src/app/blockchain/blockchain.module.ts":
/*!*************************************************!*\
  !*** ./src/app/blockchain/blockchain.module.ts ***!
  \*************************************************/
/*! exports provided: BlockchainPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockchainPageModule", function() { return BlockchainPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _blockchain_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blockchain.page */ "./src/app/blockchain/blockchain.page.ts");







var routes = [
    {
        path: '',
        component: _blockchain_page__WEBPACK_IMPORTED_MODULE_6__["BlockchainPage"]
    }
];
var BlockchainPageModule = /** @class */ (function () {
    function BlockchainPageModule() {
    }
    BlockchainPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                //  FooterComponentModule,
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_blockchain_page__WEBPACK_IMPORTED_MODULE_6__["BlockchainPage"]],
        })
    ], BlockchainPageModule);
    return BlockchainPageModule;
}());



/***/ }),

/***/ "./src/app/blockchain/blockchain.page.html":
/*!*************************************************!*\
  !*** ./src/app/blockchain/blockchain.page.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>\n      <span style=\"font-size: 23px\"> Blockchain  List </span>\n      <ion-button color=\"danger\" (click)=\"logout()\" style=\"float: right\"><ion-icon name=\"log-out\"  ></ion-icon></ion-button>\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding=\"true\" class=\"has-header\">\n  <ion-searchbar></ion-searchbar>\n  <br><br>\n\n  <table class=\"rwd-table\">\n    <tr>\n      <th>Date & Time</th>\n      <th>Sender</th>\n      <th>Recipient</th>\n      <th>Amount</th>\n      <th>IP</th>\n    </tr>\n    <tr>\n      <td data-th=\"DateTime\">25/02/2019</td>\n      <td data-th=\"Sender\">lkjhg4567gfhj567</td>\n      <td data-th=\"Recipient\">mlkjhygft56789jhgf567</td>\n      <td data-th=\"Amount\">$460,935,665</td>\n      <td data-th=\"IP\">192.168.10.20</td>\n      <ion-button shape=\"round\" expand=\"full\" color=\"warning\">Details</ion-button>\n    </tr>\n\n    <tr>\n      <td data-th=\"DateTime\">30/02/2019</td>\n      <td data-th=\"Sender\">lkjhg4567gfhj567</td>\n      <td data-th=\"Recipient\">mlkjhygft56789jhgf567</td>\n      <td data-th=\"Amount\">$460,935,665</td>\n      <td data-th=\"IP\">192.168.20.4</td>\n      <ion-button shape=\"round\" expand=\"full\" color=\"warning\">Details</ion-button>\n\n    </tr>\n  </table>\n  <!--<app-footer id=\"footer\"></app-footer>-->\n </ion-content>\n"

/***/ }),

/***/ "./src/app/blockchain/blockchain.page.scss":
/*!*************************************************!*\
  !*** ./src/app/blockchain/blockchain.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.rwd-table {\n  margin: 1em 0;\n  min-width: 300px; }\n  .rwd-table tr {\n    border-top: 1px solid #ddd;\n    border-bottom: 1px solid #ddd; }\n  .rwd-table th {\n    display: none; }\n  .rwd-table td {\n    display: block; }\n  .rwd-table td:first-child {\n      padding-top: .5em; }\n  .rwd-table td:last-child {\n      padding-bottom: .5em; }\n  .rwd-table td:before {\n      content: attr(data-th) \": \";\n      font-weight: bold;\n      width: 6.5em;\n      display: inline-block; }\n  @media (min-width: 480px) {\n        .rwd-table td:before {\n          display: none; } }\n  .rwd-table th, .rwd-table td {\n    text-align: left; }\n  @media (min-width: 480px) {\n      .rwd-table th, .rwd-table td {\n        display: table-cell;\n        padding: .25em .5em; }\n        .rwd-table th:first-child, .rwd-table td:first-child {\n          padding-left: 0; }\n        .rwd-table th:last-child, .rwd-table td:last-child {\n          padding-right: 0; } }\n  body {\n  padding: 0 2em;\n  font-family: Montserrat, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n  color: #444;\n  background: #eee; }\n  h1 {\n  font-weight: normal;\n  letter-spacing: -1px;\n  color: #34495E; }\n  .rwd-table {\n  margin-left: auto;\n  margin-right: auto;\n  background: #34495E;\n  color: #fff;\n  border-radius: .4em;\n  overflow: hidden; }\n  .rwd-table tr {\n    border-color: #46637f; }\n  .rwd-table th, .rwd-table td {\n    margin: .5em 1em; }\n  @media (min-width: 480px) {\n      .rwd-table th, .rwd-table td {\n        padding: 1em !important; } }\n  .rwd-table th, .rwd-table td:before {\n    color: #dd5; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9raGFkeS9EZXNrdG9wL2lvbmljL0Jsb2NrY2hhaW5XYWxsZXQvc3JjL2FwcC9ibG9ja2NoYWluL2Jsb2NrY2hhaW4ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtFQUNFLGFBQWE7RUFDYixnQkFBZ0IsRUFBQTtFQUZsQjtJQUtJLDBCQUEwQjtJQUMxQiw2QkFBNkIsRUFBQTtFQU5qQztJQVVJLGFBQWEsRUFBQTtFQVZqQjtJQWNJLGNBQWMsRUFBQTtFQWRsQjtNQWlCTSxpQkFBaUIsRUFBQTtFQWpCdkI7TUFvQk0sb0JBQW9CLEVBQUE7RUFwQjFCO01Bd0JNLDJCQUEwQjtNQUMxQixpQkFBaUI7TUFHakIsWUFBWTtNQUNaLHFCQUFxQixFQUFBO0VBR3JCO1FBaENOO1VBaUNRLGFBQWEsRUFBQSxFQUVoQjtFQW5DTDtJQXVDSSxnQkFBZ0IsRUFBQTtFQUVoQjtNQXpDSjtRQTBDTSxtQkFBbUI7UUFDbkIsbUJBQW1CLEVBQUE7UUEzQ3pCO1VBOENRLGVBQWUsRUFBQTtRQTlDdkI7VUFrRFEsZ0JBQWdCLEVBQUEsRUFDakI7RUFhUDtFQUNFLGNBQWM7RUFDZCxtQ0FBbUM7RUFDbkMsbUNBQW1DO0VBQ25DLGtDQUFrQztFQUNsQyxXQUFXO0VBQ1gsZ0JBQWdCLEVBQUE7RUFHbEI7RUFDRSxtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLGNBQWMsRUFBQTtFQUdoQjtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsZ0JBQWdCLEVBQUE7RUFObEI7SUFRSSxxQkFBbUMsRUFBQTtFQVJ2QztJQVdJLGdCQUFnQixFQUFBO0VBQ2hCO01BWko7UUFhTSx1QkFBdUIsRUFBQSxFQUcxQjtFQWhCSDtJQWtCSSxXQUFXLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ibG9ja2NoYWluL2Jsb2NrY2hhaW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJGJyZWFrcG9pbnQtYWxwaGE6IDQ4MHB4OyAvLyBhZGp1c3QgdG8geW91ciBuZWVkc1xuXG4ucndkLXRhYmxlIHtcbiAgbWFyZ2luOiAxZW0gMDtcbiAgbWluLXdpZHRoOiAzMDBweDsgLy8gYWRqdXN0IHRvIHlvdXIgbmVlZHNcblxuICB0ciB7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG4gIH1cblxuICB0aCB7XG4gICAgZGlzcGxheTogbm9uZTsgLy8gZm9yIGFjY2Vzc2liaWxpdHksIHVzZSBhIHZpc3VhbGx5IGhpZGRlbiBtZXRob2QgaGVyZSBpbnN0ZWFkISBUaGFua3MsIHJlZGRpdCFcbiAgfVxuXG4gIHRkIHtcbiAgICBkaXNwbGF5OiBibG9jaztcblxuICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgcGFkZGluZy10b3A6IC41ZW07XG4gICAgfVxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogLjVlbTtcbiAgICB9XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICBjb250ZW50OiBhdHRyKGRhdGEtdGgpXCI6IFwiOyAvLyB3aG8ga25ldyB5b3UgY291bGQgZG8gdGhpcz8gVGhlIGludGVybmV0LCB0aGF0J3Mgd2hvLlxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgICAgIC8vIG9wdGlvbmFsIHN0dWZmIHRvIG1ha2UgaXQgbG9vayBuaWNlclxuICAgICAgd2lkdGg6IDYuNWVtOyAvLyBtYWdpYyBudW1iZXIgOiggYWRqdXN0IGFjY29yZGluZyB0byB5b3VyIG93biBjb250ZW50XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAvLyBlbmQgb3B0aW9uc1xuXG4gICAgICBAbWVkaWEgKG1pbi13aWR0aDogJGJyZWFrcG9pbnQtYWxwaGEpIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aCwgdGQge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogJGJyZWFrcG9pbnQtYWxwaGEpIHtcbiAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gICAgICBwYWRkaW5nOiAuMjVlbSAuNWVtO1xuXG4gICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgfVxuXG4gICAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cblxufVxuXG5cbi8vIHByZXNlbnRhdGlvbmFsIHN0eWxpbmdcblxuQGltcG9ydCAnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU1vbnRzZXJyYXQ6MzAwLDQwMCw3MDAnO1xuXG5ib2R5IHtcbiAgcGFkZGluZzogMCAyZW07XG4gIGZvbnQtZmFtaWx5OiBNb250c2VycmF0LCBzYW5zLXNlcmlmO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgY29sb3I6ICM0NDQ7XG4gIGJhY2tncm91bmQ6ICNlZWU7XG59XG5cbmgxIHtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgbGV0dGVyLXNwYWNpbmc6IC0xcHg7XG4gIGNvbG9yOiAjMzQ0OTVFO1xufVxuXG4ucndkLXRhYmxlIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbiAgYmFja2dyb3VuZDogIzM0NDk1RTtcbiAgY29sb3I6ICNmZmY7XG4gIGJvcmRlci1yYWRpdXM6IC40ZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRyIHtcbiAgICBib3JkZXItY29sb3I6IGxpZ2h0ZW4oIzM0NDk1RSwgMTAlKTtcbiAgfVxuICB0aCwgdGQge1xuICAgIG1hcmdpbjogLjVlbSAxZW07XG4gICAgQG1lZGlhIChtaW4td2lkdGg6ICRicmVha3BvaW50LWFscGhhKSB7XG4gICAgICBwYWRkaW5nOiAxZW0gIWltcG9ydGFudDtcbiAgICB9XG5cbiAgfVxuICB0aCwgdGQ6YmVmb3JlIHtcbiAgICBjb2xvcjogI2RkNTtcbiAgfVxufVxuXG4iXX0= */"

/***/ }),

/***/ "./src/app/blockchain/blockchain.page.ts":
/*!***********************************************!*\
  !*** ./src/app/blockchain/blockchain.page.ts ***!
  \***********************************************/
/*! exports provided: BlockchainPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockchainPage", function() { return BlockchainPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _login_shared_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../login/shared/login.service */ "./src/app/login/shared/login.service.ts");



var BlockchainPage = /** @class */ (function () {
    function BlockchainPage(loginService) {
        this.loginService = loginService;
    }
    BlockchainPage.prototype.ngOnInit = function () {
    };
    BlockchainPage.prototype.logout = function () {
        this.loginService.logout();
    };
    BlockchainPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-blockchain',
            template: __webpack_require__(/*! ./blockchain.page.html */ "./src/app/blockchain/blockchain.page.html"),
            styles: [__webpack_require__(/*! ./blockchain.page.scss */ "./src/app/blockchain/blockchain.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_login_shared_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"]])
    ], BlockchainPage);
    return BlockchainPage;
}());



/***/ })

}]);
//# sourceMappingURL=blockchain-blockchain-module.js.map