"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TxOut = function TxOut(address, amount) {
  _classCallCheck(this, TxOut);

  _defineProperty(this, "address", '');

  _defineProperty(this, "amount", 0);

  this.address = address;
  this.amount = amount;
};

var _default = TxOut;
exports["default"] = _default;