"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Transaction = require("./Transaction");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Block = function Block(index, hash, previousHash, timestamp, data, difficulty, nonce) {
  _classCallCheck(this, Block);

  _defineProperty(this, "index", 0);

  _defineProperty(this, "previousHash", '');

  _defineProperty(this, "timestamp", 0);

  _defineProperty(this, "data", [_Transaction.Transaction]);

  _defineProperty(this, "hash", '');

  _defineProperty(this, "difficulty", 0);

  _defineProperty(this, "nonce", 0);

  this.index = index;
  this.previousHash = previousHash;
  this.timestamp = timestamp;
  this.data = data;
  this.hash = hash;
  this.difficulty = difficulty;
  this.nonce = nonce;
};

var _default = Block;
exports["default"] = _default;