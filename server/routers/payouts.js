var express = require('express');
// var payoutController = require('../../db/controllers/payouts.js');
var Payout = require('../../db/models/index.js').Payout;
var Account = require('../../db/models/index.js').Account;

var payoutRouter = express.Router();

var processPayout = (payoutData, callback) => {
  // make post request to fiber-processor
  var response = {
    request_type: 'payout',
    error: false,
    successful: true,
    message: 'payout successful'
  }
  callback(response)
}

// Create payout
payoutRouter.route('/')
  .post((req, res) => {

    var platform = req.account;
    var payoutData = req.body;

    var methods = {
      ba: 'getBankAccounts',
      card: 'getCards'
    }

    var payoutDestination = payoutData.destination ? payoutData.destination : platform.default_payout_destination

    // if amount and currency provided
    if (payoutData.amount && payoutData.currency && payoutData.amount > 0) {
      // get balance with specific currency
      platform.getBalances({where: {currency: payoutData.currency}}).then(balances => {
        var balance = balances[0];
        // if balance amount is greater than or equal to payout amount
        if (balance.available_amount >= payoutData.amount) { 
          // if payout destination provided
          if (payoutDestination) {
            var getDestinations = methods[payoutDestination.split('_')[0]];
            // find payout destination
            platform[getDestinations]({where: {id: payoutDestination}}).then(destinations => {
              var destination = destinations[0];
              // if payout destination found
              if (destination) {
                // send post request to fiber-processor with payout data
                processPayout(payoutData, payoutResponse => {
                  // if payout response is successful
                  if (payoutResponse.successful) {
                    // create payout
                    Payout.create(payoutData).then(payout => {
                      platform.addPayout(payout).then(() => {
                        // create worker process to update payout status
                        // deduct available balance by payout amount
                        balance.update({available_amount: balance.available_amount - payout.amount}).then(balance => {
                          res.send(payout);
                        })
                      })                
                    })
                  // else send forward error in response
                  } else {
                    res.send(payoutResponse);
                  }
                })
              // else send error: no payout destination found          
              } else {
                res.send({
                  error: {
                    message: 'No destination found'
                  }
                })
              }
            })
          // else if no destination
          } else {
            res.send({
              error: {
                message: 'No payout destination provided'
              }
            })
          }
        // else send insufficient balance error
        } else {
          res.send({
            error: {
              type: 'insufficient_funds_error',
              message: 'Not enough funds in available balance to create payout'
            }
          })
        }
      })
    // else send error response
    } else {
      res.send({
        error: {
          message: 'Required fields are missing'
        }
      })
    }
  });

// Get payouts
payoutRouter.route('/')
  .get((req, res) => {
    var platform = req.account;
    var queryLimit = parseInt(req.query.limit) || 10;

    platform.getPayouts({limit: queryLimit}).then(payouts => {
      res.send(payouts)
    })
  });

// Get payout with payoutId
payoutRouter.route('/:payoutId')
  .get((req, res) => {
    var platform = req.account;
    var payoutId = req.params.payoutId

    Payout.find({where: {account_id: platform.id, id: payoutId}}).then(payout => {
      res.send(payout)
    })
  });

// Update payout
payoutRouter.route('/:payoutId')
  .post((req, res) => {
    var platform = req.account;
    var payoutId = req.params.payoutId
    var payoutData = req.body

    Payout.find({where: {account_id: platform.id, id: payoutId}}).then(payout => {
      if (payout) {
        payout.update(payoutData).then(newpayout => {
          res.send(newpayout)          
        })
      } else {
        res.send({
          error: {
            message: 'payout not found'
          }
        })
      }
    })
  });



module.exports = payoutRouter;