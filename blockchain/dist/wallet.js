"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUnspentTxOuts = exports.deleteWallet = exports.initWallet = exports.generatePrivateKey = exports.getBalance = exports.getPrivateFromWallet = exports.getPublicFromWallet = exports.createTransaction = void 0;

var _elliptic = require("elliptic");

var _fs = require("fs");

var _ = _interopRequireWildcard(require("lodash"));

var _transaction = require("./transaction");

var _UnspentTxOut = _interopRequireDefault(require("./models/UnspentTxOut"));

var _TxIn = _interopRequireDefault(require("./models/TxIn"));

var _TxOut = _interopRequireDefault(require("./models/TxOut"));

var _Transaction = _interopRequireDefault(require("./models/Transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var EC = new _elliptic.ec('secp256k1');
var privateKeyLocation = process.env.PRIVATE_KEY || 'node/wallet/private_key';

var getPrivateFromWallet = function getPrivateFromWallet() {
  var buffer = (0, _fs.readFileSync)(privateKeyLocation, 'utf8');
  return buffer.toString();
};

exports.getPrivateFromWallet = getPrivateFromWallet;

var getPublicFromWallet = function getPublicFromWallet() {
  var privateKey = getPrivateFromWallet();
  var key = EC.keyFromPrivate(privateKey, 'hex');
  return key.getPublic().encode('hex');
};

exports.getPublicFromWallet = getPublicFromWallet;

var generatePrivateKey = function generatePrivateKey() {
  var keyPair = EC.genKeyPair();
  var privateKey = keyPair.getPrivate();
  return privateKey.toString(16);
};

exports.generatePrivateKey = generatePrivateKey;

var initWallet = function initWallet() {
  if ((0, _fs.existsSync)(privateKeyLocation)) {
    return;
  }

  var newPrivateKey = generatePrivateKey();
  (0, _fs.writeFileSync)(privateKeyLocation, newPrivateKey);
  console.log('new wallet with private key created to : %s', privateKeyLocation);
};

exports.initWallet = initWallet;

var deleteWallet = function deleteWallet() {
  if ((0, _fs.existsSync)(privateKeyLocation)) {
    (0, _fs.unlinkSync)(privateKeyLocation);
  }
};
/**
 *
 * @param {string} address
 * @param {UnspentTxOut[]} unspentTxOuts
 */


exports.deleteWallet = deleteWallet;

var getBalance = function getBalance(address, unspentTxOuts) {
  return _(findUnspentTxOuts(address, unspentTxOuts)).map(function (uTxO) {
    return uTxO.amount;
  }).sum();
};
/**
 *
 * @param {string} ownerAddress
 * @param {UnspentTxOut[]} unspentTxOuts
 */


exports.getBalance = getBalance;

var findUnspentTxOuts = function findUnspentTxOuts(ownerAddress, unspentTxOuts) {
  return _.filter(unspentTxOuts, function (uTxO) {
    return uTxO.address === ownerAddress;
  });
};

exports.findUnspentTxOuts = findUnspentTxOuts;

var findTxOutsForAmount = function findTxOutsForAmount(amount, myUnspentTxOuts) {
  var currentAmount = 0;
  var includedUnspentTxOuts = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = myUnspentTxOuts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var myUnspentTxOut = _step.value;
      includedUnspentTxOuts.push(myUnspentTxOut);
      currentAmount = currentAmount + myUnspentTxOut.amount;

      if (currentAmount >= amount) {
        var leftOverAmount = currentAmount - amount;
        return {
          includedUnspentTxOuts: includedUnspentTxOuts,
          leftOverAmount: leftOverAmount
        };
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

  var eMsg = 'Cannot create transaction from the available unspent transaction outputs.' + ' Required amount:' + amount + '. Available unspentTxOuts:' + JSON.stringify(myUnspentTxOuts);
  throw Error(eMsg);
};

var createTxOuts = function createTxOuts(receiverAddress, myAddress, amount, leftOverAmount) {
  var txOut1 = new _TxOut["default"](receiverAddress, amount);

  if (leftOverAmount === 0) {
    return [txOut1];
  } else {
    var leftOverTx = new _TxOut["default"](myAddress, leftOverAmount);
    return [txOut1, leftOverTx];
  }
};

var filterTxPoolTxs = function filterTxPoolTxs(unspentTxOuts, transactionPool) {
  var txIns = _(transactionPool).map(function (tx) {
    return tx.txIns;
  }).flatten().value();

  var removable = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var unspentTxOut = _step2.value;

      var txIn = _.find(txIns, function (aTxIn) {
        return aTxIn.txOutIndex === unspentTxOut.txOutIndex && aTxIn.txOutId === unspentTxOut.txOutId;
      });

      if (txIn === undefined) {} else {
        removable.push(unspentTxOut);
      }
    };

    for (var _iterator2 = unspentTxOuts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
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

  return _.without.apply(_, [unspentTxOuts].concat(removable));
};

var createTransaction = function createTransaction(receiverAddress, amount, privateKey, unspentTxOuts, txPool) {
  console.log('txPool: %s', JSON.stringify(txPool));
  var myAddress = (0, _transaction.getPublicKey)(privateKey);
  var myUnspentTxOutsA = unspentTxOuts.filter(function (uTxO) {
    return uTxO.address === myAddress;
  });
  var myUnspentTxOuts = filterTxPoolTxs(myUnspentTxOutsA, txPool);

  var _findTxOutsForAmount = findTxOutsForAmount(amount, myUnspentTxOuts),
      includedUnspentTxOuts = _findTxOutsForAmount.includedUnspentTxOuts,
      leftOverAmount = _findTxOutsForAmount.leftOverAmount;

  var toUnsignedTxIn = function toUnsignedTxIn(unspentTxOut) {
    var txIn = new _TxIn["default"]();
    txIn.txOutId = unspentTxOut.txOutId;
    txIn.txOutIndex = unspentTxOut.txOutIndex;
    return txIn;
  };

  var unsignedTxIns = includedUnspentTxOuts.map(toUnsignedTxIn);
  var tx = new _Transaction["default"]();
  tx.txIns = unsignedTxIns;
  tx.txOuts = createTxOuts(receiverAddress, myAddress, amount, leftOverAmount);
  tx.id = (0, _transaction.getTransactionId)(tx);
  tx.txIns = tx.txIns.map(function (txIn, index) {
    txIn.signature = (0, _transaction.signTxIn)(tx, index, privateKey, unspentTxOuts);
    return txIn;
  });
  return tx;
};

exports.createTransaction = createTransaction;