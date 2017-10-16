var express = require('express');
var transferController = require('../../db/controllers/transfers.js');
var transfer = require('../../db/models/index.js').transfer;

var transferRouter = express.Router();


// Create transfer
transferRouter.route('/')
  .post((req, res) => {
    var platform = req.account;
    // var transferData = generateTokenAndUploadtoVault(req.body);
    var transferData = req.body;
    transferController.create(transferData, transfer => {
      res.send(transfer);  
    })
  });

// Update transfer
transferRouter.route('/:transferId')
  .post((req, res) => {
    var platform = req.account;
    // var transferData = generateTokenAndUploadtoVault(req.body);
    var transferId = req.params.transferId;

    account.gettransfers({where: {id: transferId}}).then(transfers => {
      var transfer = transfers[0]
      if (transfer) {
        res.send[transfer]
      } else {
        res.send({
          error: {
            type: 'not_found_error',
            message: 'No transfer found'
          }
        })
      }
    })
  });

// Get transfers
transferRouter.route('/')
  .get((req, res) => {
    var platform = req.account;

    transferController.findAll({where: {account_id: platform.id}}, transfer => {
      res.send(transfer);
    })
  });


// Get transfer with transferId
transferRouter.route('/:transferId')
  .get((req, res) => {
    var platform = req.account;
    var transferId = req.params.transferId

    transferController.find({where: {id: transferId}}, transfer => {
      res.send(transfer);
    })
  });



module.exports = transferRouter;