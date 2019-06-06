"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _lodash = _interopRequireDefault(require("lodash"));

var blockchain = _interopRequireWildcard(require("./blockchain"));

var p2p = _interopRequireWildcard(require("./p2p"));

var transactionPool = _interopRequireWildcard(require("./transactionPool"));

var wallet = _interopRequireWildcard(require("./wallet"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var httpPort = parseInt(process.env.HTTP_PORT) || 3001;
var p2pPort = parseInt(process.env.P2P_PORT) || 6001;

var initHttpServer = function initHttpServer(myHttpPort) {
  var app = (0, _express["default"])();
  app.use((0, _cors["default"])({
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

  }));
  app.use(_bodyParser["default"].json());
  app.use(function (err, req, res, next) {
    if (err) {
      res.status(400).send(err.message);
    }
  });
  app.get('/blocks', function (req, res) {
    res.send(blockchain.getBlockchain());
  });
  app.get('/block/:hash', function (req, res) {
    var block = _lodash["default"].find(blockchain.getBlockchain(), {
      hash: req.params.hash
    });

    res.send(block);
  });
  app.get('/transaction/:id', function (req, res) {
    var tx = (0, _lodash["default"])(blockchain.getBlockchain()).map(function (blocks) {
      return blocks.data;
    }).flatten().find({
      id: req.params.id
    });
    res.send(tx);
  });
  app.get('/address/:address', function (req, res) {
    var unspentTxOuts = _lodash["default"].filter(blockchain.getUnspentTxOuts(), function (uTxO) {
      return uTxO.address === req.params.address;
    });

    res.send({
      unspentTxOuts: unspentTxOuts
    });
  });
  app.get('/unspentTransactionOutputs', function (req, res) {
    res.send(blockchain.getUnspentTxOuts());
  });
  app.get('/myUnspentTransactionOutputs', function (req, res) {
    res.send(blockchain.getMyUnspentTransactionOutputs());
  });
  app.post('/mineRawBlock', function (req, res) {
    if (req.body.data == null) {
      res.send('data parameter is missing');
      return;
    }

    var newBlock = blockchain.generateRawNextBlock(req.body.data);

    if (newBlock === null) {
      res.status(400).send('could not generate block');
    } else {
      res.send(newBlock);
    }
  });
  app.post('/mineBlock', function (req, res) {
    var newBlock = blockchain.generateNextBlock();

    if (newBlock === null) {
      res.status(400).send('could not generate block');
    } else {
      res.send(newBlock);
    }
  });
  app.get('/balance', function (req, res) {
    var balance = blockchain.getAccountBalance();
    res.send({
      balance: balance
    });
  });
  app.get('/address', function (req, res) {
    var address = wallet.getPublicFromWallet();
    res.send({
      address: address
    });
  });
  app.post('/mineTransaction', function (req, res) {
    var address = req.body.address;
    var amount = req.body.amount;

    try {
      var resp = blockchain.generatenextBlockWithTransaction(address, amount);
      res.send(resp);
    } catch (e) {
      console.log(e.message);
      res.status(400).send(e.message);
    }
  });
  app.post('/sendTransaction', function (req, res) {
    try {
      var address = req.body.address;
      var amount = req.body.amount;

      if (address === undefined || amount === undefined) {
        throw Error('invalid address or amount');
      }

      var resp = blockchain.sendTransaction(address, amount);
      res.send(resp);
    } catch (e) {
      console.log(e.message);
      res.status(400).send(e.message);
    }
  });
  app.get('/transactionPool', function (req, res) {
    res.send(transactionPool.getTransactionPool());
  });
  app.get('/peers', function (req, res) {
    res.send(p2p.getSockets().map(function (s) {
      return s._socket.remoteAddress + ':' + s._socket.remotePort;
    }));
  });
  app.post('/addPeer', function (req, res) {
    p2p.connectToPeers(req.body.peer);
    res.send();
  });
  app.post('/stop', function (req, res) {
    res.send({
      msg: 'stopping server'
    });
    process.exit();
  });
  app.listen(myHttpPort, function () {
    console.log('Listening http on port: ' + myHttpPort);
  });
};

initHttpServer(httpPort);
p2p.initP2PServer(p2pPort);
wallet.initWallet();