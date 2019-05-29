import Block from './models/Block';
import _ from 'lodash';

import CryptoJS from 'crypto-js';
import * as p2p from './p2p';
import * as transaction from './transaction';
import * as transactionPool from './transactionPool';
import * as util from './util';
import * as wallet from './wallet';

// First transaction on Coinbase
const genesisTransaction = {
  txIns: [{ signature: '', txOutId: '', txOutIndex: 0 }],
  txOuts: [
    {
      address: '04bfcab8722991ae774db48f934ca79cfb7dd991229153b9f732ba5334aafcd8e7266e47076996b55a14bf9913ee3145ce0cfc1372ada8ada74bd287450313534a',
      amount: 50
    }
  ],
  id: 'e655f6a5f26dc9b4cac6e46f52336428287759cf81ef5ff10854f69d68f43fa3'
};
// First Block
const genesisBlock = new Block(0, '91a73664bc84c0baa1fc75ea6e4aa6d1d20c5df664c724e3159aefc2e1186627', '', 1465154705, [genesisTransaction], 0, 0);

let blockchain = [genesisBlock];
let unspentTxOuts = transaction.processTransactions(blockchain[0].data, [], 0);

/**
 * Return the current blockchain
 */
export const getBlockchain = () => blockchain;

/**
 * Return the unspent transactions outputs
 */
export const getUnspentTxOuts = () => _.cloneDeep(unspentTxOuts);

/**
 * Replace the current unspents transactions outputs
 */
export const setUnspentTxOuts = newUnspentTxOut => {
  console.log('Replacing unspentTxouts with: ' + newUnspentTxOut);
  unspentTxOuts = newUnspentTxOut;
};

/**
 * Return the last block of the blockchain
 */
export const getLatestBlock = () => blockchain[blockchain.length - 1];

const BLOCK_GENERATION_INTERVAL = 10;
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;

/**
 * Return the difficulty of the blockchain in parameter
 * @param {[Block]} aBlockchain The blockchain to take the difficulty
 */
const getDifficulty = aBlockchain => {
  const latestBlock = aBlockchain[blockchain.length - 1];
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
const getAdjustedDifficulty = (latestBlock, aBlockchain) => {
  const prevAdjustmentBlock = aBlockchain[blockchain.length - DIFFICULTY_ADJUSTMENT_INTERVAL];
  const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL;
  const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp;
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
const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000);

/**
 * Generate a new block with some data
 * @param {any} blockData The data to put in the block
 */
export const generateRawNextBlock = blockData => {
  const previousBlock = getLatestBlock();
  const difficulty = getDifficulty(getBlockchain());
  const nextIndex = previousBlock.index + 1;
  const nextTimestamp = getCurrentTimestamp();
  const newBlock = findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData, difficulty);
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
export const getMyUnspentTransactionOutputs = () => {
  return wallet.findUnspentTxOuts(wallet.getPublicFromWallet(), getUnspentTxOuts());
};

/**
 * Generate a new block
 */
export const generateNextBlock = () => {
  const coinbaseTx = transaction.getCoinbaseTransaction(wallet.getPublicFromWallet(), getLatestBlock().index + 1);
  const blockData = [coinbaseTx].concat(transactionPool.getTransactionPool());
  return generateRawNextBlock(blockData);
};

/**
 * Generate a new block with a transaction for a wallet
 * @param {string} receiverAddress The wallet recipient
 * @param {number} amount The amount of gthe transaction
 */
export const generatenextBlockWithTransaction = (receiverAddress, amount) => {
  if (!transaction.isValidAddress(receiverAddress)) {
    throw Error('Invalid Address');
  }
  if (typeof amount !== 'number') {
    throw Error('Invalid Amount');
  }
  const coinbaseTx = transaction.getCoinbaseTransaction(wallet.getPublicFromWallet(), getLatestBlock().index + 1);
  const tx = wallet.createTransaction(receiverAddress, amount, wallet.getPrivateFromWallet(), getUnspentTxOuts(), transactionPool.getTransactionPool());
  const blockData = [coinbaseTx, tx];
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
const findBlock = (index, previousHash, timestamp, data, difficulty) => {
  let nonce = 0;
  while (true) {
    const hash = calculateHash(index, previousHash, timestamp, data, difficulty, nonce);
    if (hashMatchesDifficulty(hash, difficulty)) {
      return new Block(index, hash, previousHash, timestamp, data, difficulty, nonce);
    }
    nonce++;
  }
};
const getAccountBalance = () => {
  return wallet.getBalance(wallet.getPublicFromWallet(), getUnspentTxOuts());
};
exports.getAccountBalance = getAccountBalance;
const sendTransaction = (address, amount) => {
  const tx = wallet.createTransaction(address, amount, wallet.getPrivateFromWallet(), getUnspentTxOuts(), transactionPool.getTransactionPool());
  transactionPool.addToTransactionPool(tx, getUnspentTxOuts());
  p2p.broadCastTransactionPool();
  return tx;
};
exports.sendTransaction = sendTransaction;
const calculateHashForBlock = block => calculateHash(block.index, block.previousHash, block.timestamp, block.data, block.difficulty, block.nonce);
const calculateHash = (index, previousHash, timestamp, data, difficulty, nonce) => CryptoJS.SHA256(index + previousHash + timestamp + data + difficulty + nonce).toString();
const isValidBlockStructure = block => {
  return typeof block.index === 'number' && typeof block.hash === 'string' && typeof block.previousHash === 'string' && typeof block.timestamp === 'number' && typeof block.data === 'object';
};
exports.isValidBlockStructure = isValidBlockStructure;
const isValidNewBlock = (newBlock, previousBlock) => {
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
const getAccumulatedDifficulty = aBlockchain => {
  return aBlockchain
    .map(block => block.difficulty)
    .map(difficulty => Math.pow(2, difficulty))
    .reduce((a, b) => a + b);
};
const isValidTimestamp = (newBlock, previousBlock) => {
  return previousBlock.timestamp - 60 < newBlock.timestamp && newBlock.timestamp - 60 < getCurrentTimestamp();
};
const hasValidHash = block => {
  if (!hashMatchesBlockContent(block)) {
    console.log('invalid hash, got:' + block.hash);
    return false;
  }
  if (!hashMatchesDifficulty(block.hash, block.difficulty)) {
    console.log('block difficulty not satisfied. Expected: ' + block.difficulty + 'got: ' + block.hash);
  }
  return true;
};
const hashMatchesBlockContent = block => {
  const blockHash = calculateHashForBlock(block);
  return blockHash === block.hash;
};
const hashMatchesDifficulty = (hash, difficulty) => {
  const hashInBinary = util.hexToBinary(hash);
  const requiredPrefix = '0'.repeat(difficulty);
  return hashInBinary.startsWith(requiredPrefix);
};
/*
    Checks if the given blockchain is valid. Return the unspent txOuts if the chain is valid
 */
const isValidChain = blockchainToValidate => {
  console.log('isValidChain:');
  console.log(JSON.stringify(blockchainToValidate));
  const isValidGenesis = block => {
    return JSON.stringify(block) === JSON.stringify(genesisBlock);
  };
  if (!isValidGenesis(blockchainToValidate[0])) {
    return null;
  }
  /*
    Validate each block in the chain. The block is valid if the block structure is valid
      and the transaction are valid
     */
  let aUnspentTxOuts = [];
  for (let i = 0; i < blockchainToValidate.length; i++) {
    const currentBlock = blockchainToValidate[i];
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
const addBlockToChain = newBlock => {
  if (isValidNewBlock(newBlock, getLatestBlock())) {
    const retVal = transaction.processTransactions(newBlock.data, getUnspentTxOuts(), newBlock.index);
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
const replaceChain = newBlocks => {
  const aUnspentTxOuts = isValidChain(newBlocks);
  const validChain = aUnspentTxOuts !== null;
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
const handleReceivedTransaction = transaction => {
  transactionPool.addToTransactionPool(transaction, getUnspentTxOuts());
};
exports.handleReceivedTransaction = handleReceivedTransaction;
//# sourceMappingURL=blockchain.js.map
