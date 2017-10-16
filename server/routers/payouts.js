var express = require('express');
var payoutController = require('../../db/controllers/payouts.js');
var payout = require('../../db/models/index.js').payout;

var payoutRouter = express.Router();


// Create payout
payoutRouter.route('/')
  .post((req, res) => {
    var platform = req.account;
    // var payoutData = generateTokenAndUploadtoVault(req.body);
    var payoutData = req.body;
    payoutController.create(payoutData, payout => {
      res.send(payout);  
    })
  });

// Update payout
payoutRouter.route('/:payoutId')
  .post((req, res) => {
    var platform = req.account;
    // var payoutData = generateTokenAndUploadtoVault(req.body);
    var payoutId = req.params.payoutId;

    account.getpayouts({where: {id: payoutId}}).then(payouts => {
      var payout = payouts[0]
      if (payout) {
        res.send[payout]
      } else {
        res.send({
          error: {
            type: 'not_found_error',
            message: 'No payout found'
          }
        })
      }
    })
  });

// Get payouts
payoutRouter.route('/')
  .get((req, res) => {
    var platform = req.account;

    payoutController.findAll({where: {account_id: platform.id}}, payout => {
      res.send(payout);
    })
  });


// Get payout with payoutId
payoutRouter.route('/:payoutId')
  .get((req, res) => {
    var platform = req.account;
    var payoutId = req.params.payoutId

    payoutController.find({where: {id: payoutId}}, payout => {
      res.send(payout);
    })
  });



module.exports = payoutRouter;