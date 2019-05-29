import CryptoJS from 'crypto-js';
import ecdsa from 'elliptic';
import _ from 'lodash';

// Classes importations
import Transaction from './models/Transaction';
import TxIn from './models/TxIn';
import TxOut from './models/TxOut';
import UnspentTxOut from './models/UnspentTxOut';

// Base Wallet
const COINBASE_AMOUNT = 50;
const ec = new ecdsa.ec('secp256k1');

/**
 * Return the representation id of the transaction encrypted in SHA256
 * @param {Transaction} transaction
 */
const getTransactionId = transaction => {
  const txInContent = transaction.txIns.map(txIn => txIn.txOutId + txIn.txOutIndex).reduce((a, b) => a + b, '');
  const txOutContent = transaction.txOuts.map(txOut => txOut.address + txOut.amount).reduce((a, b) => a + b, '');
  return CryptoJS.SHA256(txInContent + txOutContent).toString();
};

/**
 *  Validate a transaction
 * @param {Transaction} transaction The transaction to validate
 * @param {UnspentTxOut} aUnspentTxOuts The unspent transaction outputs to validate
 */
const validateTransaction = (transaction, aUnspentTxOuts) => {
  if (!isValidTransactionStructure(transaction)) {
    console.log('Invalid transaction structure in : ' + transaction.id);
    return false;
  }
  if (getTransactionId(transaction) !== transaction.id) {
    console.log('Invalid transaction id: ' + transaction.id);
    return false;
  }

  const hasValidTxIns = transaction.txIns.map(txIn => validateTxIn(txIn, transaction, aUnspentTxOuts)).reduce((a, b) => a && b, true);
  if (!hasValidTxIns) {
    console.log('Some of transaction inputs are invalid in : ' + transaction.id);
    return false;
  }

  const totalTxIn = transaction.txIns.map(txIn => getTxInAmount(txIn, aUnspentTxOuts)).reduce((a, b) => a + b, 0);
  const totalTxOut = transaction.txOuts.map(txOut => txOut.amount).reduce((a, b) => a + b, 0);
  if (totalTxOut !== totalTxIn) {
    console.log('totalTxOut !== totalTxIn in : ' + transaction.id);
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
const validateBlockTransactions = (aTransactions, aUnspentTxOuts, blockIndex) => {
  const coinbaseTx = aTransactions[0];
  if (!validateCoinbaseTx(coinbaseTx, blockIndex)) {
    console.log('Invalid coinbase transaction: ' + JSON.stringify(coinbaseTx));
    return false;
  }
  // Check for duplicate transaction inputs. Each can exist only once
  const txIns = _(aTransactions)
    .map(tx => tx.txIns)
    .flatten()
    .value();
  if (hasDuplicates(txIns)) {
    return false;
  }
  // All but coinbase transactions
  const normalTransactions = aTransactions.slice(1);
  return normalTransactions.map(tx => validateTransaction(tx, aUnspentTxOuts)).reduce((a, b) => a && b, true);
};

/**
 * Verify all transaction input, if there are duplicate transaction input, return false
 * @param {[TxIn]} txIns The transaction inputs to search on
 */
export const hasDuplicates = txIns => {
  const groups = _.countBy(txIns, txIn => txIn.txOutId + txIn.txOutIndex);
  return _(groups)
    .map((value, key) => {
      if (value > 1) {
        console.log('Duplicate txIn: ' + key);
        return true;
      } else {
        return false;
      }
    })
    .includes(true);
};

const validateCoinbaseTx = (transaction, blockIndex) => {
  if (transaction == null) {
    console.log('the first transaction in the block must be coinbase transaction');
    return false;
  }
  if (getTransactionId(transaction) !== transaction.id) {
    console.log('invalid coinbase tx id: ' + transaction.id);
    return false;
  }
  if (transaction.txIns.length !== 1) {
    console.log('one txIn must be specified in the coinbase transaction');
    return;
  }
  if (transaction.txIns[0].txOutIndex !== blockIndex) {
    console.log('the txIn signature in coinbase tx must be the block height');
    return false;
  }
  if (transaction.txOuts.length !== 1) {
    console.log('invalid number of txOuts in coinbase transaction');
    return false;
  }
  if (transaction.txOuts[0].amount !== COINBASE_AMOUNT) {
    console.log('invalid coinbase amount in coinbase transaction');
    return false;
  }
  return true;
};

const validateTxIn = (txIn, transaction, aUnspentTxOuts) => {
  const referencedUTxOut = aUnspentTxOuts.find(uTxO => uTxO.txOutId === txIn.txOutId && uTxO.txOutIndex === txIn.txOutIndex);
  if (referencedUTxOut == null) {
    console.log('referenced txOut not found: ' + JSON.stringify(txIn));
    return false;
  }
  const address = referencedUTxOut.address;
  const key = ec.keyFromPublic(address, 'hex');
  const validSignature = key.verify(transaction.id, txIn.signature);
  if (!validSignature) {
    console.log('invalid txIn signature: %s txId: %s address: %s', txIn.signature, transaction.id, referencedUTxOut.address);
    return false;
  }
  return true;
};

const getTxInAmount = (txIn, aUnspentTxOuts) => {
  return findUnspentTxOut(txIn.txOutId, txIn.txOutIndex, aUnspentTxOuts).amount;
};

const findUnspentTxOut = (transactionId, index, aUnspentTxOuts) => {
  return aUnspentTxOuts.find(uTxO => uTxO.txOutId === transactionId && uTxO.txOutIndex === index);
};

export const getCoinbaseTransaction = (address, blockIndex) => {
  const t = new Transaction();
  const txIn = new TxIn();
  txIn.signature = '';
  txIn.txOutId = '';
  txIn.txOutIndex = blockIndex;
  t.txIns = [txIn];
  t.txOuts = [new TxOut(address, COINBASE_AMOUNT)];
  t.id = getTransactionId(t);
  return t;
};

export const signTxIn = (transaction, txInIndex, privateKey, aUnspentTxOuts) => {
  const txIn = transaction.txIns[txInIndex];
  const dataToSign = transaction.id;
  const referencedUnspentTxOut = findUnspentTxOut(txIn.txOutId, txIn.txOutIndex, aUnspentTxOuts);
  if (referencedUnspentTxOut == null) {
    console.log('could not find referenced txOut');
    throw Error();
  }
  const referencedAddress = referencedUnspentTxOut.address;
  if (getPublicKey(privateKey) !== referencedAddress) {
    console.log('trying to sign an input with private' + ' key that does not match the address that is referenced in txIn');
    throw Error();
  }
  const key = ec.keyFromPrivate(privateKey, 'hex');
  const signature = toHexString(key.sign(dataToSign).toDER());
  return signature;
};

const updateUnspentTxOuts = (aTransactions, aUnspentTxOuts) => {
  const newUnspentTxOuts = aTransactions
    .map(t => {
      return t.txOuts.map((txOut, index) => new UnspentTxOut(t.id, index, txOut.address, txOut.amount));
    })
    .reduce((a, b) => a.concat(b), []);
  const consumedTxOuts = aTransactions
    .map(t => t.txIns)
    .reduce((a, b) => a.concat(b), [])
    .map(txIn => new UnspentTxOut(txIn.txOutId, txIn.txOutIndex, '', 0));
  const resultingUnspentTxOuts = aUnspentTxOuts.filter(uTxO => !findUnspentTxOut(uTxO.txOutId, uTxO.txOutIndex, consumedTxOuts)).concat(newUnspentTxOuts);
  return resultingUnspentTxOuts;
};

export const processTransactions = (aTransactions, aUnspentTxOuts, blockIndex) => {
  if (!validateBlockTransactions(aTransactions, aUnspentTxOuts, blockIndex)) {
    console.log('invalid block transactions');
    return null;
  }
  return updateUnspentTxOuts(aTransactions, aUnspentTxOuts);
};

/**
 * Transform an array of byte into string
 * @param {[byte]} byteArray The array to transform in string
 */
const toHexString = byteArray => {
  return Array.from(byteArray, byte => {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

/**
 * return the public key of the private key
 * @param {string} aPrivateKey The private key to base on to get th epublic key
 */
export const getPublicKey = aPrivateKey => {
  return ec
    .keyFromPrivate(aPrivateKey, 'hex')
    .getPublic()
    .encode('hex');
};

/**
 * Ensure that the transactioon input object match what is wanted
 * @param {TxIn} txIn the txIn structure to verify
 *
 */
const isValidTxInStructure = txIn => {
  if (txIn == null) {
    console.log('txIn is null');
    return false;
  } else if (typeof txIn.signature !== 'string') {
    console.log('invalid signature type in txIn');
    return false;
  } else if (typeof txIn.txOutId !== 'string') {
    console.log('invalid txOutId type in txIn');
    return false;
  } else if (typeof txIn.txOutIndex !== 'number') {
    console.log('invalid txOutIndex type in txIn');
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
const isValidTxOutStructure = txOut => {
  if (txOut == null) {
    console.log('transaction output is null');
    return false;
  } else if (typeof txOut.address !== 'string') {
    console.log('Invalid address type in transaction output');
    return false;
  } else if (!isValidAddress(txOut.address)) {
    console.log('Invalid TxOut address');
    return false;
  } else if (typeof txOut.amount !== 'number') {
    console.log('Invalid amount type in transaction output');
    return false;
  } else {
    return true;
  }
};

/**
 * Verify the structure of the transaction to ensure it match the object wanted
 * @param {Transaction} transaction The transaction to verify
 */
const isValidTransactionStructure = transaction => {
  if (typeof transaction.id !== 'string') {
    console.log('TransactionId missing or bad type');
    return false;
  }
  if (!(transaction.txIns instanceof Array)) {
    console.log('Invalid transaction inputs type in transaction');
    return false;
  }
  if (!transaction.txIns.map(isValidTxInStructure).reduce((a, b) => a && b, true)) {
    return false;
  }
  if (!(transaction.txOuts instanceof Array)) {
    console.log('Invalid transaction outputs type in transaction');
    return false;
  }
  if (!transaction.txOuts.map(isValidTxOutStructure).reduce((a, b) => a && b, true)) {
    return false;
  }
  return true;
};

/**
 * Valid ECDSA public key on the adress
 * @param {string} address
 */
export const isValidAddress = address => {
  if (address.length !== 130) {
    console.log(address);
    console.log('invalid public key length');
    return false;
  } else if (address.match('^[a-fA-F0-9]+$') === null) {
    console.log('public key must contain only hex characters');
    return false;
  } else if (!address.startsWith('04')) {
    console.log('public key must start with 04');
    return false;
  }
  return true;
};
