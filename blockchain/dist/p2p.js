"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.broadCastTransactionPool = exports.connectToPeers = exports.broadcastLatest = exports.getSockets = exports.initP2PServer = void 0;

var _ws = _interopRequireDefault(require("ws"));

var blockchain = _interopRequireWildcard(require("./blockchain"));

var transactionPool = _interopRequireWildcard(require("./transactionPool"));

var _Transaction = _interopRequireDefault(require("./models/Transaction"));

var _MessageType = _interopRequireDefault(require("./enums/MessageType"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sockets = [];

var initP2PServer = function initP2PServer(p2pPort) {
  var server = new _ws["default"].Server({
    port: p2pPort
  });
  server.on('connection', function (ws) {
    initConnection(ws);
  });
  console.log('listening websocket p2p port on: ' + p2pPort);
};

exports.initP2PServer = initP2PServer;

var getSockets = function getSockets() {
  return sockets;
};

exports.getSockets = getSockets;

var initConnection = function initConnection(ws) {
  sockets.push(ws);
  initMessageHandler(ws);
  initErrorHandler(ws);
  write(ws, queryChainLengthMsg()); // query transactions pool only some time after chain query

  setTimeout(function () {
    broadcast(queryTransactionPoolMsg());
  }, 500);
};

var JSONToObject = function JSONToObject(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return null;
  }
};

var initMessageHandler = function initMessageHandler(ws) {
  ws.on('message', function (data) {
    try {
      var message = JSONToObject(data);

      if (message === null) {
        console.log('could not parse received JSON message: ' + data);
        return;
      }

      console.log('Received message: %s', JSON.stringify(message));

      switch (message.type) {
        case _MessageType["default"].QUERY_LATEST:
          write(ws, responseLatestMsg());
          break;

        case _MessageType["default"].QUERY_ALL:
          write(ws, responseChainMsg());
          break;

        case _MessageType["default"].RESPONSE_BLOCKCHAIN:
          var receivedBlocks = JSONToObject(message.data);

          if (receivedBlocks === null) {
            console.log('invalid blocks received: %s', JSON.stringify(message.data));
            break;
          }

          handleBlockchainResponse(receivedBlocks);
          break;

        case _MessageType["default"].QUERY_TRANSACTION_POOL:
          write(ws, responseTransactionPoolMsg());
          break;

        case _MessageType["default"].RESPONSE_TRANSACTION_POOL:
          var receivedTransactions = JSONToObject(message.data);

          if (receivedTransactions === null) {
            console.log('invalid transaction received: %s', JSON.stringify(message.data));
            break;
          }

          receivedTransactions.forEach(function (transaction) {
            try {
              blockchain.handleReceivedTransaction(transaction); // if no error is thrown, transaction was indeed added to the pool
              // let's broadcast transaction pool

              broadCastTransactionPool();
            } catch (e) {
              console.log(e.message);
            }
          });
          break;
      }
    } catch (e) {
      console.log(e);
    }
  });
};

var write = function write(ws, message) {
  return ws.send(JSON.stringify(message));
};

var broadcast = function broadcast(message) {
  return sockets.forEach(function (socket) {
    return write(socket, message);
  });
};

var queryChainLengthMsg = function queryChainLengthMsg() {
  return {
    type: _MessageType["default"].QUERY_LATEST,
    data: null
  };
};

var queryAllMsg = function queryAllMsg() {
  return {
    type: _MessageType["default"].QUERY_ALL,
    data: null
  };
};

var responseChainMsg = function responseChainMsg() {
  return {
    type: _MessageType["default"].RESPONSE_BLOCKCHAIN,
    data: JSON.stringify(blockchain.getBlockchain())
  };
};

var responseLatestMsg = function responseLatestMsg() {
  return {
    type: _MessageType["default"].RESPONSE_BLOCKCHAIN,
    data: JSON.stringify([blockchain.getLatestBlock()])
  };
};

var queryTransactionPoolMsg = function queryTransactionPoolMsg() {
  return {
    type: _MessageType["default"].QUERY_TRANSACTION_POOL,
    data: null
  };
};

var responseTransactionPoolMsg = function responseTransactionPoolMsg() {
  return {
    type: _MessageType["default"].RESPONSE_TRANSACTION_POOL,
    data: JSON.stringify(transactionPool.getTransactionPool())
  };
};

var initErrorHandler = function initErrorHandler(ws) {
  var closeConnection = function closeConnection(myWs) {
    console.log('connection failed to peer: ' + myWs.url);
    sockets.splice(sockets.indexOf(myWs), 1);
  };

  ws.on('close', function () {
    return closeConnection(ws);
  });
  ws.on('error', function () {
    return closeConnection(ws);
  });
};

var handleBlockchainResponse = function handleBlockchainResponse(receivedBlocks) {
  if (receivedBlocks.length === 0) {
    console.log('received block chain size of 0');
    return;
  }

  var latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];

  if (!blockchain.isValidBlockStructure(latestBlockReceived)) {
    console.log('block structuture not valid');
    return;
  }

  var latestBlockHeld = blockchain.getLatestBlock();

  if (latestBlockReceived.index > latestBlockHeld.index) {
    console.log('blockchain possibly behind. We got: ' + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);

    if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
      if (blockchain.addBlockToChain(latestBlockReceived)) {
        broadcast(responseLatestMsg());
      }
    } else if (receivedBlocks.length === 1) {
      console.log('We have to query the chain from our peer');
      broadcast(queryAllMsg());
    } else {
      console.log('Received blockchain is longer than current blockchain');
      blockchain.replaceChain(receivedBlocks);
    }
  } else {
    console.log('received blockchain is not longer than received blockchain. Do nothing');
  }
};

var broadcastLatest = function broadcastLatest() {
  broadcast(responseLatestMsg());
};

exports.broadcastLatest = broadcastLatest;

var connectToPeers = function connectToPeers(newPeer) {
  var ws = new _ws["default"](newPeer);
  ws.on('open', function () {
    initConnection(ws);
  });
  ws.on('error', function () {
    console.log('connection failed');
  });
};

exports.connectToPeers = connectToPeers;

var broadCastTransactionPool = function broadCastTransactionPool() {
  broadcast(responseTransactionPoolMsg());
};

exports.broadCastTransactionPool = broadCastTransactionPool;