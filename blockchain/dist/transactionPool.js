"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTransactionPool = exports.addToTransactionPool = exports.getTransactionPool = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _transaction = require("./transaction");

var _Transaction = _interopRequireDefault(require("./models/Transaction"));

var _TxIn = _interopRequireDefault(require("./models/TxIn"));

var _UnspentTxOut = _interopRequireDefault(require("./models/UnspentTxOut"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transactionPool = [];

var getTransactionPool = function getTransactionPool() {
  return _lodash["default"].cloneDeep(transactionPool);
};
/**
 *
 * @param {Transaction} tx
 * @param {UnspentTxOut[]} unspentTxOuts
 */


exports.getTransactionPool = getTransactionPool;

var addToTransactionPool = function addToTransactionPool(tx, unspentTxOuts) {
  if (!(0, _transaction.validateTransaction)(tx, unspentTxOuts)) {
    throw Error('Trying to add invalid tx to pool');
  }

  if (!isValidTxForPool(tx, transactionPool)) {
    throw Error('Trying to add invalid tx to pool');
  }

  console.log('adding to txPool: %s', JSON.stringify(tx));
  transactionPool.push(tx);
};
/**
 *
 * @param {TxIn} txIn
 * @param {UnspentTxOut[]} unspentTxOuts
 */


exports.addToTransactionPool = addToTransactionPool;

var hasTxIn = function hasTxIn(txIn, unspentTxOuts) {
  var foundTxIn = unspentTxOuts.find(function (uTxO) {
    return uTxO.txOutId === txIn.txOutId && uTxO.txOutIndex === txIn.txOutIndex;
  });
  return foundTxIn !== undefined;
};
/**
 *
 * @param {UnspentTxOut[]} unspentTxOuts
 */


var updateTransactionPool = function updateTransactionPool(unspentTxOuts) {
  var invalidTxs = [];

  for (var _i = 0, _transactionPool = transactionPool; _i < _transactionPool.length; _i++) {
    var tx = _transactionPool[_i];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = tx.txIns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var txIn = _step.value;

        if (!hasTxIn(txIn, unspentTxOuts)) {
          invalidTxs.push(tx);
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  if (invalidTxs.length > 0) {
    console.log('removing the following transactions from txPool: %s', JSON.stringify(invalidTxs));
    transactionPool = _lodash["default"].without.apply(_lodash["default"], [transactionPool].concat(invalidTxs));
  }
};
/**
 *
 * @param {Transaction[]} aTransactionPool
 */


exports.updateTransactionPool = updateTransactionPool;

var getTxPoolIns = function getTxPoolIns(aTransactionPool) {
  return (0, _lodash["default"])(aTransactionPool).map(function (tx) {
    return tx.txIns;
  }).flatten().value();
};
/**
 *
 * @param {Transaction} tx
 * @param {Transaction[]} aTtransactionPool
 */


var isValidTxForPool = function isValidTxForPool(tx, aTtransactionPool) {
  var txPoolIns = getTxPoolIns(aTtransactionPool);
  /**
   *
   * @param {TxIn[]} txIns
   * @param {TxIn} txIn
   */

  var containsTxIn = function containsTxIn(txIns, txIn) {
    return _lodash["default"].find(txPoolIns, function (txPoolIn) {
      return txIn.txOutIndex === txPoolIn.txOutIndex && txIn.txOutId === txPoolIn.txOutId;
    });
  };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = tx.txIns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var txIn = _step2.value;

      if (containsTxIn(txPoolIns, txIn)) {
        console.log('txIn already found in the txPool');
        return false;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return true;
};