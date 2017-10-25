var express = require('express');
var accountController = require('../../db/controllers/accounts.js');
var Account = require('../../db/models/index.js').Account;
var ConnectedAccount = require('../../db/models/index.js').ConnectedAccount;

var recipientRouter = express.Router();

// Create recipient account
recipientRouter.route('/')
  .post(function(req, res, next) {
    var platform = req.account;
    var recipientInformation = Object.assign(req.body)

    platform.getConnectedAccount({where: recipientInformation}).then(recipients => {

      if (recipients[0]) {
        res.send({message: 'account already connected'});
      } else if (recipientInformation.account_type === 'standard') {
        // sendConnectionInvite(accountInformation.email)
        res.send('connection invite sent')
      } else {
        accountController.create(recipientInformation, newRecipient => {
          platform.addConnectedAccount(newRecipient).then(accountConnection => {
            accountConnection[0][0].update({connection_type: 'platform-recipient'})
            res.send(newRecipient)
          })
        })
      }
    })
  });

// List all connected accounts
recipientRouter.route('/')
  .get((req, res) => {
    var queryLimit = parseInt(req.query.limit) || 10
    var platform = req.account;

    platform.getConnectedAccount({limit: queryLimit}).then(recipients => {
      
      recipients = recipients.filter(recipient => {
        return recipient.connected_accounts.connection_type === 'platform-recipient'
      })
      res.send(recipients)
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
recipientRouter.route('/:recipientId')
  .post(function(req, res) {
    var platform = req.account;
    var recipientId = req.params.recipientId;

    platform.getConnectedAccount({where: {id: recipientId}}).then(accounts => {
      var recipient = accounts[0]
      if (recipient) {
        if (recipient.account_type === 'custom') {
          recipient.update(req.body).then(updatedAccount => {
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