"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UnspentTxOut = function UnspentTxOut(txOutId, txOutIndex, address, amount) {
  _classCallCheck(this, UnspentTxOut);

  _defineProperty(this, "txOutId", '');

  _defineProperty(this, "txOutIndex", 0);

  _defineProperty(this, "address", '');

  _defineProperty(this, "amount", 0);

  this.txOutId = txOutId;
  this.txOutIndex = txOutIndex;
  this.address = address;
  this.amount = amount;
};

var _default = UnspentTxOut;
exports["default"] = _default;