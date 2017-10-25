var express = require('express');
// var transferController = require('../../db/controllers/transfers.js');
var Transfer = require('../../db/models/index.js').Transfer;
var Account = require('../../db/models/index.js').Account;

var transferRouter = express.Router();


// Create transfer
transferRouter.route('/')
  .post((req, res) => {

    var platform = req.account;
    var transferData = req.body;

    Account.find({where: {id: transferData.receiver_id}}).then(receiver => {
      platform.getBalances({where: {currency: transferData.currency}}).then(senderBalances => {
        var senderBalance = senderBalances[0]
        receiver.getBalances({where: {currency: transferData.currency}}).then(receiverBalances => {
          var receiverBalance = receiverBalances[0]
          if (senderBalance.available_amount >= transferData.amount) {
            senderBalance.update({available_amount: senderBalance.available_amount - transferData.amount}).then(newSenderBalance => {
              receiverBalance.update({available_amount: receiverBalance.available_amount + transferData.amount}).then(newReceiverBalance => {
                platform.addReceiver(receiver, {through: transferData}).then(transfer => {
                  res.send(transfer[0][0])
                })
              })
            })
          } else {
            res.send({
              error: {
                message: 'Not enough funds in balance to make transfer'
              }
            })
          }
        })
      })
    })
  });

// Get transfers
transferRouter.route('/')
  .get((req, res) => {
    var platform = req.account;
    var queryLimit = parseInt(req.query.limit) || 10;

    Transfer.findAll({limit: queryLimit, where: {sender_id: platform.id}}).then(transfers => {
      res.send(transfers)
    })
  });

// Get transfer with transferId
transferRouter.route('/:transferId')
  .get((req, res) => {
    var platform = req.account;
    var transferId = req.params.transferId

    Transfer.find({where: {sender_id: platform.id, id: transferId}}).then(transfer => {
      res.send(transfer)
    })
  });

// Update transfer
transferRouter.route('/:transferId')
  .post((req, res) => {
    var platform = req.account;
    var transferId = req.params.transferId
    var transferData = req.body

    Transfer.find({where: {sender_id: platform.id, id: transferId}}).then(transfer => {
      if (transfer) {
        transfer.update(transferData).then(newTransfer => {
          res.send(newTransfer)          
        })
      } else {
        res.send({
          error: {
            message: 'Transfer not found'
          }
        })
      }
    })
  });



module.exports = transferRouter;