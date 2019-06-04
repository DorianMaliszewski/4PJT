"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidAddress = exports.getPublicKey = exports.processTransactions = exports.signTxIn = exports.getCoinbaseTransaction = exports.hasDuplicates = exports.validateBlockTransactions = exports.validateTransaction = exports.getTransactionId = void 0;

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _elliptic = _interopRequireDefault(require("elliptic"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Transaction = _interopRequireDefault(require("./models/Transaction"));

var _TxIn = _interopRequireDefault(require("./models/TxIn"));

var _TxOut = _interopRequireDefault(require("./models/TxOut"));

var _UnspentTxOut = _interopRequireDefault(require("./models/UnspentTxOut"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Classes importations
// Base Wallet
var COINBASE_AMOUNT = 50;
var ec = new _elliptic["default"].ec("secp256k1");
/**
 * Return the representation id of the transaction encrypted in SHA256
 * @param {Transaction} transaction
 */

var getTransactionId = function getTransactionId(transaction) {
  var txInContent = transaction.txIns.map(function (txIn) {
    return txIn.txOutId + txIn.txOutIndex;
  }).reduce(function (a, b) {
    return a + b;
  }, "");
  var txOutContent = transaction.txOuts.map(function (txOut) {
    return txOut.address + txOut.amount;
  }).reduce(function (a, b) {
    return a + b;
  }, "");
  return _cryptoJs["default"].SHA256(txInContent + txOutContent).toString();
};
/**
 *  Validate a transaction
 * @param {Transaction} transaction The transaction to validate
 * @param {UnspentTxOut} aUnspentTxOuts The unspent transaction outputs to validate
 */


exports.getTransactionId = getTransactionId;

var validateTransaction = function validateTransaction(transaction, aUnspentTxOuts) {
  if (!isValidTransactionStructure(transaction)) {
    console.log("Invalid transaction structure in : " + transaction.id);
    return false;
  }

  if (getTransactionId(transaction) !== transaction.id) {
    console.log("Invalid transaction id: " + transaction.id);
    return false;
  }

  var hasValidTxIns = transaction.txIns.map(function (txIn) {
    return validateTxIn(txIn, transaction, aUnspentTxOuts);
  }).reduce(function (a, b) {
    return a && b;
  }, true);

  if (!hasValidTxIns) {
    console.log("Some of transaction inputs are invalid in : " + transaction.id);
    return false;
  }

  var totalTxIn = transaction.txIns.map(function (txIn) {
    return getTxInAmount(txIn, aUnspentTxOuts);
  }).reduce(function (a, b) {
    return a + b;
  }, 0);
  var totalTxOut = transaction.txOuts.map(function (txOut) {
    return txOut.amount;
  }).reduce(function (a, b) {
    return a + b;
  }, 0);

  if (totalTxOut !== totalTxIn) {
    console.log("totalTxOut !== totalTxIn in : " + transaction.id);
    return false;
  }

  return true;
};
/**
 * Validate user transaction in a block
 * @param {[Transaction]} aTransactions Transactions to validate
 * @param {[UnspentTxOut]} aUnspentTxOuts Transaction outputs to validate
 * @param {number} blockIndex The index of the block to validate
 */


exports.validateTransaction = validateTransaction;

var validateBlockTransactions = function validateBlockTransactions(aTransactions, aUnspentTxOuts, blockIndex) {
  var coinbaseTx = aTransactions[0];

  if (!validateCoinbaseTx(coinbaseTx, blockIndex)) {
    console.log("Invalid coinbase transaction: " + JSON.stringify(coinbaseTx));
    return false;
  } // Check for duplicate transaction inputs. Each can exist only once


  var txIns = (0, _lodash["default"])(aTransactions).map(function (tx) {
    return tx.txIns;
  }).flatten().value();

  if (hasDuplicates(txIns)) {
    return false;
  } // All but coinbase transactions


  var normalTransactions = aTransactions.slice(1);
  return normalTransactions.map(function (tx) {
    return validateTransaction(tx, aUnspentTxOuts);
  }).reduce(function (a, b) {
    return a && b;
  }, true);
};
/**
 * Verify all transaction input, if there are duplicate transaction input, return false
 * @param {[TxIn]} txIns The transaction inputs to search on
 */


exports.validateBlockTransactions = validateBlockTransactions;

var hasDuplicates = function hasDuplicates(txIns) {
  var groups = _lodash["default"].countBy(txIns, function (txIn) {
    return txIn.txOutId + txIn.txOutIndex;
  });

  return (0, _lodash["default"])(groups).map(function (value, key) {
    if (value > 1) {
      console.log("Duplicate txIn: " + key);
      return true;
    } else {
      return false;
    }
  }).includes(true);
};

exports.hasDuplicates = hasDuplicates;

var validateCoinbaseTx = function validateCoinbaseTx(transaction, blockIndex) {
  if (transaction == null) {
    console.log("the first transaction in the block must be coinbase transaction");
    return false;
  }

  if (getTransactionId(transaction) !== transaction.id) {
    console.log("invalid coinbase tx id: " + transaction.id);
    return false;
  }

  if (transaction.txIns.length !== 1) {
    console.log("one txIn must be specified in the coinbase transaction");
    return;
  }

  if (transaction.txIns[0].txOutIndex !== blockIndex) {
    console.log("the txIn signature in coinbase tx must be the block height");
    return false;
  }

  if (transaction.txOuts.length !== 1) {
    console.log("invalid number of txOuts in coinbase transaction");
    return false;
  }

  if (transaction.txOuts[0].amount !== COINBASE_AMOUNT) {
    console.log("invalid coinbase amount in coinbase transaction");
    return false;
  }

  return true;
};

var validateTxIn = function validateTxIn(txIn, transaction, aUnspentTxOuts) {
  var referencedUTxOut = aUnspentTxOuts.find(function (uTxO) {
    return uTxO.txOutId === txIn.txOutId && uTxO.txOutIndex === txIn.txOutIndex;
  });

  if (referencedUTxOut == null) {
    console.log("referenced txOut not found: " + JSON.stringify(txIn));
    return false;
  }

  var address = referencedUTxOut.address;
  var key = ec.keyFromPublic(address, "hex");
  var validSignature = key.verify(transaction.id, txIn.signature);

  if (!validSignature) {
    console.log("invalid txIn signature: %s txId: %s address: %s", txIn.signature, transaction.id, referencedUTxOut.address);
    return false;
  }

  return true;
};

var getTxInAmount = function getTxInAmount(txIn, aUnspentTxOuts) {
  return findUnspentTxOut(txIn.txOutId, txIn.txOutIndex, aUnspentTxOuts).amount;
};

var findUnspentTxOut = function findUnspentTxOut(transactionId, index, aUnspentTxOuts) {
  return aUnspentTxOuts.find(function (uTxO) {
    return uTxO.txOutId === transactionId && uTxO.txOutIndex === index;
  });
};

var getCoinbaseTransaction = function getCoinbaseTransaction(address, blockIndex) {
  var t = new _Transaction["default"]();
  var txIn = new _TxIn["default"]();
  txIn.signature = "";
  txIn.txOutId = "";
  txIn.txOutIndex = blockIndex;
  t.txIns = [txIn];
  t.txOuts = [new _TxOut["default"](address, COINBASE_AMOUNT)];
  t.id = getTransactionId(t);
  return t;
};

exports.getCoinbaseTransaction = getCoinbaseTransaction;

var signTxIn = function signTxIn(transaction, txInIndex, privateKey, aUnspentTxOuts) {
  var txIn = transaction.txIns[txInIndex];
  var dataToSign = transaction.id;
  var referencedUnspentTxOut = findUnspentTxOut(txIn.txOutId, txIn.txOutIndex, aUnspentTxOuts);

  if (referencedUnspentTxOut == null) {
    console.log("could not find referenced txOut");
    throw Error();
  }

  var referencedAddress = referencedUnspentTxOut.address;

  if (getPublicKey(privateKey) !== referencedAddress) {
    console.log("trying to sign an input with private" + " key that does not match the address that is referenced in txIn");
    throw Error();
  }

  var key = ec.keyFromPrivate(privateKey, "hex");
  var signature = toHexString(key.sign(dataToSign).toDER());
  return signature;
};

exports.signTxIn = signTxIn;

var updateUnspentTxOuts = function updateUnspentTxOuts(aTransactions, aUnspentTxOuts) {
  var newUnspentTxOuts = aTransactions.map(function (t) {
    return t.txOuts.map(function (txOut, index) {
      return new _UnspentTxOut["default"](t.id, index, txOut.address, txOut.amount);
    });
  }).reduce(function (a, b) {
    return a.concat(b);
  }, []);
  var consumedTxOuts = aTransactions.map(function (t) {
    return t.txIns;
  }).reduce(function (a, b) {
    return a.concat(b);
  }, []).map(function (txIn) {
    return new _UnspentTxOut["default"](txIn.txOutId, txIn.txOutIndex, "", 0);
  });
  var resultingUnspentTxOuts = aUnspentTxOuts.filter(function (uTxO) {
    return !findUnspentTxOut(uTxO.txOutId, uTxO.txOutIndex, consumedTxOuts);
  }).concat(newUnspentTxOuts);
  return resultingUnspentTxOuts;
};

var processTransactions = function processTransactions(aTransactions, aUnspentTxOuts, blockIndex) {
  if (!validateBlockTransactions(aTransactions, aUnspentTxOuts, blockIndex)) {
    console.log("invalid block transactions");
    return null;
  }

  return updateUnspentTxOuts(aTransactions, aUnspentTxOuts);
};
/**
 * Transform an array of byte into string
 * @param {[byte]} byteArray The array to transform in string
 */


exports.processTransactions = processTransactions;

var toHexString = function toHexString(byteArray) {
  return Array.from(byteArray, function (_byte) {
    return ("0" + (_byte & 0xff).toString(16)).slice(-2);
  }).join("");
};
/**
 * return the public key of the private key
 * @param {string} aPrivateKey The private key to base on to get th epublic key
 */


var getPublicKey = function getPublicKey(aPrivateKey) {
  return ec.keyFromPrivate(aPrivateKey, "hex").getPublic().encode("hex");
};
/**
 * Ensure that the transactioon input object match what is wanted
 * @param {TxIn} txIn the txIn structure to verify
 *
 */


exports.getPublicKey = getPublicKey;

var isValidTxInStructure = function isValidTxInStructure(txIn) {
  if (txIn == null) {
    console.log("txIn is null");
    return false;
  } else if (typeof txIn.signature !== "string") {
    console.log("invalid signature type in txIn");
    return false;
  } else if (typeof txIn.txOutId !== "string") {
    console.log("invalid txOutId type in txIn");
    return false;
  } else if (typeof txIn.txOutIndex !== "number") {
    console.log("invalid txOutIndex type in txIn");
    return false;
  } else {
    return true;
  }
};
/**
 * Ensure that the transactioon output object match what is wanted
 * @param {TxOut} txOut the txOut structure to verify
 *
 */


var isValidTxOutStructure = function isValidTxOutStructure(txOut) {
  if (txOut == null) {
    console.log("transaction output is null");
    return false;
  } else if (typeof txOut.address !== "string") {
    console.log("Invalid address type in transaction output");
    return false;
  } else if (!isValidAddress(txOut.address)) {
    console.log("Invalid TxOut address");
    return false;
  } else if (typeof txOut.amount !== "number") {
    console.log("Invalid amount type in transaction output");
    return false;
  } else {
    return true;
  }
};
/**
 * Verify the structure of the transaction to ensure it match the object wanted
 * @param {Transaction} transaction The transaction to verify
 */


var isValidTransactionStructure = function isValidTransactionStructure(transaction) {
  if (typeof transaction.id !== "string") {
    console.log("TransactionId missing or bad type");
    return false;
  }

  if (!(transaction.txIns instanceof Array)) {
    console.log("Invalid transaction inputs type in transaction");
    return false;
  }

  if (!transaction.txIns.map(isValidTxInStructure).reduce(function (a, b) {
    return a && b;
  }, true)) {
    return false;
  }

  if (!(transaction.txOuts instanceof Array)) {
    console.log("Invalid transaction outputs type in transaction");
    return false;
  }

  if (!transaction.txOuts.map(isValidTxOutStructure).reduce(function (a, b) {
    return a && b;
  }, true)) {
    return false;
  }

  return true;
};
/**
 * Valid ECDSA public key on the adress
 * @param {string} address
 */


var isValidAddress = function isValidAddress(address) {
  if (address.length !== 130) {
    console.log(address);
    console.log("invalid public key length");
    return false;
  } else if (address.match("^[a-fA-F0-9]+$") === null) {
    console.log("public key must contain only hex characters");
    return false;
  } else if (!address.startsWith("04")) {
    console.log("public key must start with 04");
    return false;
  }

  return true;
};

exports.isValidAddress = isValidAddress;