var express = require('express');
var chargeController = require('../../db/controllers/charges.js');
var Charge = require('../../db/models/index.js').Charge;

var chargeRouter = express.Router();


// Create charge
chargeRouter.route('/')
  .post((req, res) => {
    var platform = req.account;
    // var chargeData = generateTokenAndUploadtoVault(req.body);
    var chargeData = req.body;

    platform.getCards({where: {id: chargeData.source}}).then(cards => {
      var card = cards[0];
      if (card) {
        Charge.create(chargeData).then(charge => {
          platform.addCharge(charge).then(account => {
            res.send(charge);
          })
        })
      } else {
        res.send({
          error: {
            message: 'Source not found'
          }
        })
      }
    })
  });

// Get charges
chargeRouter.route('/')
  .get((req, res) => {
    var platform = req.account;
    var queryLimit = parseInt(req.query.limit) || 10;

    platform.getCharges({limit: queryLimit}).then(charges => {
      res.send(charges)
    })
  });

// Get charge with chargeId
chargeRouter.route('/:chargeId')
  .get((req, res) => {
    var platform = req.account;
    var chargeId = req.params.chargeId

    platform.getCharges({where: {id: chargeId}}).then(charges => {
      res.send(charges[0])
    })
  });

// Update charge
chargeRouter.route('/:chargeId')
  .post((req, res) => {
    var platform = req.account;
    // var chargeData = generateTokenAndUploadtoVault(req.body);
    var chargeId = req.params.chargeId;

    platform.getCharges({where: {id: chargeId}}).then(charges => {
      var charge = charges[0]
      if (charge) {
        charge.update(req.body).then(newCharge => {
          res.send(charge)          
        })
      } else {
        res.send({
          error: {
            type: 'not_found_error',
            message: 'No charge found'
          }
        })
      }
    })
  });



module.exports = chargeRouter;