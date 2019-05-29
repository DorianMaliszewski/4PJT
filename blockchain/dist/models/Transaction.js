"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Transaction = function Transaction() {
  _classCallCheck(this, Transaction);

  _defineProperty(this, "id", '');

  _defineProperty(this, "txIns", []);

  _defineProperty(this, "txOuts", []);
};

var _default = Transaction;
exports["default"] = _default;