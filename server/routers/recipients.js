var express = require('express');
var accountController = require('../../db/controllers/accounts.js');
var Account = require('../../db/models/index.js').Account;

var recipientRouter = express.Router();

// Create recipient account
recipientRouter.route('/')
  .post(function(req, res, next) {
    var platform = req.account;
    var recipientInformation = {
      email: req.body.email,
      entity_type: req.body.entity_type,
      account_type: req.body.account_type,
      country: req.body.country || 'UAE'
    }
    
    platform.getConnectedAccount({where: recipientInformation}).then(recipients => {
      if (recipients[0]) {
        res.send({message: 'account already connected'});
      } else if (recipientInformation.account_type === 'standard') {
        // sendConnectionInvite(accountInformation.email)
        res.send('connection invite sent')
      } else {
        accountController.create(recipientInformation, newRecipient => {
          platform.addConnectedAccount(newRecipient).then(() => {
            res.send('Account created successfully')
          })
        })
      }
    })
  });

// Get connected account information
recipientRouter.route('/:recipientId')
  .get(function(req, res) {
    var platform = req.account;
    var recipientId = req.params.recipientId;

    platform.getConnectedAccount({where: {id: recipientId}}).then(recipients => {
      if (recipients[0]){
        res.send(recipients[0])
      } else {
        res.send('No recipients found with that id');
      }
    })
  })
  

// Update connected account
accountRouter.route('/:recipientId')
  .post(function(req, res) {
    var platform = req.account;
    var recipientId = req.params.recipientId;

    platform.getConnectedAccount({where: {id: recipientId}}).then(accounts => {
      if (accounts[0]) {
        if (accounts[0].account_type === 'custom') {
          Account.update(req.body, {where: {id: recipientId}}).then(updatedAccount => {
            res.send(updatedAccount);
          })
        } else {
          res.send({error: {
            type: 'permission_error',
            message: 'You cannot update a standard connected account. A standard account can only be updated by the owner of the account'
          }})
        }
      } else {
        res.send('No connected accounts found with that id');
      }
    })
  });

// List all connected accounts
recipientRouter.route('/')
  .get((req, res) => {
    var queryLimit = parseInt(req.query.limit) || 10
    var platform = req.account;

    platform.getConnectedAccount({limit: queryLimit}).then(recipients => {
      res.send(recipients)
    })
  });

// Reject or flag account
recipientRouter.route('/:recipientId/reject')
  .get((req, res) => {
    var platform = req.account;
    var recipientId = req.params.recipientId;
    var reason = req.body.reason;

    platform.getConnectedAccount({where: {id: recipientId}}).then(accounts => {
      var account = accounts[0];
      if (account){
        platform.setConnectedAccount(accounts[0], {rejected: true, rejected_reason: reason, transfers_enabled: false, charges_enabled: false})
      } else {
        res.send('No connected accounts found with that id');
      }
    })
  });

module.exports = recipientRouter;