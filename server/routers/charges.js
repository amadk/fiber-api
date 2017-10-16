var express = require('express');
var chargeController = require('../../db/controllers/charges.js');
var charge = require('../../db/models/index.js').charge;

var chargeRouter = express.Router();


// Create charge
chargeRouter.route('/')
  .post((req, res) => {
    var platform = req.account;
    // var chargeData = generateTokenAndUploadtoVault(req.body);
    var chargeData = req.body;
    chargeController.create(chargeData, charge => {
      res.send(charge);  
    })
  });

// Update charge
chargeRouter.route('/:chargeId')
  .post((req, res) => {
    var platform = req.account;
    // var chargeData = generateTokenAndUploadtoVault(req.body);
    var chargeId = req.params.chargeId;

    account.getcharges({where: {id: chargeId}}).then(charges => {
      var charge = charges[0]
      if (charge) {
        res.send[charge]
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

// Get charges
chargeRouter.route('/')
  .get((req, res) => {
    var platform = req.account;

    chargeController.findAll({where: {account_id: platform.id}}, charge => {
      res.send(charge);
    })
  });


// Get charge with chargeId
chargeRouter.route('/:chargeId')
  .get((req, res) => {
    var platform = req.account;
    var chargeId = req.params.chargeId

    chargeController.find({where: {id: chargeId}}, charge => {
      res.send(charge);
    })
  });



module.exports = chargeRouter;