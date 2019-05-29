import { Transaction } from './Transaction';

class Block {
  index = 0;
  previousHash = '';
  timestamp = 0;
  data = [Transaction];
  hash = '';
  difficulty = 0;
  nonce = 0;

  constructor(index, hash, previousHash, timestamp, data, difficulty, nonce) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }
}

export default Block;
