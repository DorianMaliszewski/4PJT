class UnspentTxOut {
  txOutId = '';
  txOutIndex = 0;
  address = '';
  amount = 0;

  constructor(txOutId, txOutIndex, address, amount) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.address = address;
    this.amount = amount;
  }
}

export default UnspentTxOut;
