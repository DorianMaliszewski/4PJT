"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatenextBlockWithTransaction = exports.generateNextBlock = exports.getMyUnspentTransactionOutputs = exports.generateRawNextBlock = exports.getLatestBlock = exports.setUnspentTxOuts = exports.getUnspentTxOuts = exports.getBlockchain = void 0;

var _Block = _interopRequireDefault(require("./models/Block"));

var _lodash = _interopRequireDefault(require("lodash"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var p2p = _interopRequireWildcard(require("./p2p"));

var transaction = _interopRequireWildcard(require("./transaction"));

var transactionPool = _interopRequireWildcard(require("./transactionPool"));

var util = _interopRequireWildcard(require("./util"));

var wallet = _interopRequireWildcard(require("./wallet"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// First transaction on Coinbase
var genesisTransaction = {
  txIns: [{
    signature: '',
    txOutId: '',
    txOutIndex: 0
  }],
  txOuts: [{
    address: '04bfcab8722991ae774db48f934ca79cfb7dd991229153b9f732ba5334aafcd8e7266e47076996b55a14bf9913ee3145ce0cfc1372ada8ada74bd287450313534a',
    amount: 50
  }],
  id: 'e655f6a5f26dc9b4cac6e46f52336428287759cf81ef5ff10854f69d68f43fa3'
}; // First Block

var genesisBlock = new _Block["default"](0, '91a73664bc84c0baa1fc75ea6e4aa6d1d20c5df664c724e3159aefc2e1186627', '', 1465154705, [genesisTransaction], 0, 0);
var blockchain = [genesisBlock];
var unspentTxOuts = transaction.processTransactions(blockchain[0].data, [], 0);
/**
 * Return the current blockchain
 */

var getBlockchain = function getBlockchain() {
  return blockchain;
};
/**
 * Return the unspent transactions outputs
 */


exports.getBlockchain = getBlockchain;

var getUnspentTxOuts = function getUnspentTxOuts() {
  return _lodash["default"].cloneDeep(unspentTxOuts);
};
/**
 * Replace the current unspents transactions outputs
 */


exports.getUnspentTxOuts = getUnspentTxOuts;

var setUnspentTxOuts = function setUnspentTxOuts(newUnspentTxOut) {
  console.log('Replacing unspentTxouts with: ' + newUnspentTxOut);
  unspentTxOuts = newUnspentTxOut;
};
/**
 * Return the last block of the blockchain
 */


exports.setUnspentTxOuts = setUnspentTxOuts;

var getLatestBlock = function getLatestBlock() {
  return blockchain[blockchain.length - 1];
};

exports.getLatestBlock = getLatestBlock;
var BLOCK_GENERATION_INTERVAL = 10;
var DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
/**
 * Return the difficulty of the blockchain in parameter
 * @param {[Block]} aBlockchain The blockchain to take the difficulty
 */

var getDifficulty = function getDifficulty(aBlockchain) {
  var latestBlock = aBlockchain[blockchain.length - 1];

  if (latestBlock.index % DIFFICULTY_ADJUSTMENT_INTERVAL === 0 && latestBlock.index !== 0) {
    return getAdjustedDifficulty(latestBlock, aBlockchain);
  } else {
    return latestBlock.difficulty;
  }
};
/**
 * Adjust the difficulty of the blockcahin
 * @param {Block} latestBlock The last block of the chain
 * @param {[Block]} aBlockchain The blockchain
 */


var getAdjustedDifficulty = function getAdjustedDifficulty(latestBlock, aBlockchain) {
  var prevAdjustmentBlock = aBlockchain[blockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
  var timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
  var timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;

  if (timeTaken < timeExpected / 2) {
    return prevAdjustmentBlock.difficulty + 1;
  } else if (timeTaken > timeExpected * 2) {
    return prevAdjustmentBlock.difficulty - 1;
  } else {
    return prevAdjustmentBlock.difficulty;
  }
};
/**
 * Return current timestamp without milliseconds
 */


var getCurrentTimestamp = function getCurrentTimestamp() {
  return Math.round(new Date().getTime() / 1000);
};
/**
 * Generate a new block with some data
 * @param {any} blockData The data to put in the block
 */


var generateRawNextBlock = function generateRawNextBlock(blockData) {
  var previousBlock = getLatestBlock();
  var difficulty = getDifficulty(getBlockchain());
  var nextIndex = previousBlock.index + 1;
  var nextTimestamp = getCurrentTimestamp();
  var newBlock = findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);

  if (addBlockToChain(newBlock)) {
    p2p.broadcastLatest();
    return newBlock;
  } else {
    return null;
  }
};
/**
 * Return the unspent transaction outputs of the wallet
 */


exports.generateRawNextBlock = generateRawNextBlock;

var getMyUnspentTransactionOutputs = function getMyUnspentTransactionOutputs() {
  return wallet.findUnspentTxOuts(wallet.getPublicFromWallet(), getUnspentTxOuts());
};
/**
 * Generate a new block
 */


exports.getMyUnspentTransactionOutputs = getMyUnspentTransactionOutputs;

var generateNextBlock = function generateNextBlock() {
  var coinbaseTx = transaction.getCoinbaseTransaction(wallet.getPublicFromWallet(), getLatestBlock().index + 1);
  var blockData = [coinbaseTx].concat(transactionPool.getTransactionPool());
  return generateRawNextBlock(blockData);
};
/**
 * Generate a new block with a transaction for a wallet
 * @param {string} receiverAddress The wallet recipient
 * @param {number} amount The amount of gthe transaction
 */


exports.generateNextBlock = generateNextBlock;

var generatenextBlockWithTransaction = function generatenextBlockWithTransaction(receiverAddress, amount) {
  if (!transaction.isValidAddress(receiverAddress)) {
    throw Error('Invalid Address');
  }

  if (typeof amount !== 'number') {
    throw Error('Invalid Amount');
  }

  var coinbaseTx = transaction.getCoinbaseTransaction(wallet.getPublicFromWallet(), getLatestBlock().index + 1);
  var tx = wallet.createTransaction(receiverAddress, amount, wallet.getPrivateFromWallet(), getUnspentTxOuts(), transactionPool.getTransactionPool());
  var blockData = [coinbaseTx, tx];
  return generateRawNextBlock(blockData);
};
/**
 *
 * @param {number} index The index of the block
 * @param {string} previousHash The hash of the previous block
 * @param {number} timestamp The timestamp to put in the block
 * @param {[Transaction]} data The transactions to put in the block
 * @param {number} difficulty The difficulty of the block
 */


exports.generatenextBlockWithTransaction = generatenextBlockWithTransaction;

var findBlock = function findBlock(index, previousHash, timestamp, data, difficulty) {
  var nonce = 0;

  while (true) {
    var hash = calculateHash(index, previousHash, timestamp, data, difficulty, nonce);

    if (hashMatchesDifficulty(hash, difficulty)) {
      return new _Block["default"](index, hash, previousHash, timestamp, data, difficulty, nonce);
    }

    nonce++;
  }
};

var getAccountBalance = function getAccountBalance() {
  return wallet.getBalance(wallet.getPublicFromWallet(), getUnspentTxOuts());
};

exports.getAccountBalance = getAccountBalance;

var sendTransaction = function sendTransaction(address, amount) {
  var tx = wallet.createTransaction(address, amount, wallet.getPrivateFromWallet(), getUnspentTxOuts(), transactionPool.getTransactionPool());
  transactionPool.addToTransactionPool(tx, getUnspentTxOuts());
  p2p.broadCastTransactionPool();
  return tx;
};

exports.sendTransaction = sendTransaction;

var calculateHashForBlock = function calculateHashForBlock(block) {
  return calculateHash(block.index, block.previousHash, block.timestamp, block.data, block.difficulty, block.nonce);
};

var calculateHash = function calculateHash(index, previousHash, timestamp, data, difficulty, nonce) {
  return _cryptoJs["default"].SHA256(index + previousHash + timestamp + data + difficulty + nonce).toString();
};

var isValidBlockStructure = function isValidBlockStructure(block) {
  return typeof block.index === 'number' && typeof block.hash === 'string' && typeof block.previousHash === 'string' && typeof block.timestamp === 'number' && _typeof(block.data) === 'object';
};

exports.isValidBlockStructure = isValidBlockStructure;

var isValidNewBlock = function isValidNewBlock(newBlock, previousBlock) {
  if (!isValidBlockStructure(newBlock)) {
    console.log('invalid block structure: %s', JSON.stringify(newBlock));
    return false;
  }

  if (previousBlock.index + 1 !== newBlock.index) {
    console.log('invalid index');
    return false;
  } else if (previousBlock.hash !== newBlock.previousHash) {
    console.log('invalid previoushash');
    return false;
  } else if (!isValidTimestamp(newBlock, previousBlock)) {
    console.log('invalid timestamp');
    return false;
  } else if (!hasValidHash(newBlock)) {
    return false;
  }

  return true;
};

var getAccumulatedDifficulty = function getAccumulatedDifficulty(aBlockchain) {
  return aBlockchain.map(function (block) {
    return block.difficulty;
  }).map(function (difficulty) {
    return Math.pow(2, difficulty);
  }).reduce(function (a, b) {
    return a + b;
  });
};

var isValidTimestamp = function isValidTimestamp(newBlock, previousBlock) {
  return previousBlock.timestamp - 60 < newBlock.timestamp && newBlock.timestamp - 60 < getCurrentTimestamp();
};

var hasValidHash = function hasValidHash(block) {
  if (!hashMatchesBlockContent(block)) {
    console.log('invalid hash, got:' + block.hash);
    return false;
  }

  if (!hashMatchesDifficulty(block.hash, block.difficulty)) {
    console.log('block difficulty not satisfied. Expected: ' + block.difficulty + 'got: ' + block.hash);
  }

  return true;
};

var hashMatchesBlockContent = function hashMatchesBlockContent(block) {
  var blockHash = calculateHashForBlock(block);
  return blockHash === block.hash;
};

var hashMatchesDifficulty = function hashMatchesDifficulty(hash, difficulty) {
  var hashInBinary = util.hexToBinary(hash);
  var requiredPrefix = '0'.repeat(difficulty);
  return hashInBinary.startsWith(requiredPrefix);
};
/*
    Checks if the given blockchain is valid. Return the unspent txOuts if the chain is valid
 */


var isValidChain = function isValidChain(blockchainToValidate) {
  console.log('isValidChain:');
  console.log(JSON.stringify(blockchainToValidate));

  var isValidGenesis = function isValidGenesis(block) {
    return JSON.stringify(block) === JSON.stringify(genesisBlock);
  };

  if (!isValidGenesis(blockchainToValidate[0])) {
    return null;
  }
  /*
    Validate each block in the chain. The block is valid if the block structure is valid
      and the transaction are valid
     */


  var aUnspentTxOuts = [];

  for (var i = 0; i < blockchainToValidate.length; i++) {
    var currentBlock = blockchainToValidate[i];

    if (i !== 0 && !isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])) {
      return null;
    }

    aUnspentTxOuts = transaction.processTransactions(currentBlock.data, aUnspentTxOuts, currentBlock.index);

    if (aUnspentTxOuts === null) {
      console.log('invalid transactions in blockchain');
      return null;
    }
  }

  return aUnspentTxOuts;
};

var addBlockToChain = function addBlockToChain(newBlock) {
  if (isValidNewBlock(newBlock, getLatestBlock())) {
    var retVal = transaction.processTransactions(newBlock.data, getUnspentTxOuts(), newBlock.index);

    if (retVal === null) {
      console.log('block is not valid in terms of transactions');
      return false;
    } else {
      blockchain.push(newBlock);
      setUnspentTxOuts(retVal);
      transactionPool.updateTransactionPool(unspentTxOuts);
      return true;
    }
  }

  return false;
};

exports.addBlockToChain = addBlockToChain;

var replaceChain = function replaceChain(newBlocks) {
  var aUnspentTxOuts = isValidChain(newBlocks);
  var validChain = aUnspentTxOuts !== null;

  if (validChain && getAccumulatedDifficulty(newBlocks) > getAccumulatedDifficulty(getBlockchain())) {
    console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
    blockchain = newBlocks;
    setUnspentTxOuts(aUnspentTxOuts);
    transactionPool.updateTransactionPool(unspentTxOuts);
    p2p.broadcastLatest();
  } else {
    console.log('Received blockchain invalid');
  }
};

exports.replaceChain = replaceChain;

var handleReceivedTransaction = function handleReceivedTransaction(transaction) {
  transactionPool.addToTransactionPool(transaction, getUnspentTxOuts());
};

exports.handleReceivedTransaction = handleReceivedTransaction;