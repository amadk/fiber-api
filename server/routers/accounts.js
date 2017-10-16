var express = require('express');
var accountController = require('../../db/controllers/accounts.js');
var Account = require('../../db/models/index.js').Account;
const bcrypt = require('bcryptjs');
var auth = require('basic-auth');

var accountRouter = express.Router();


accountRouter.route('/signup')
  .post(function(req, res) {

    var credentials = auth(req);
    var email = credentials.name;
    var pass = credentials.pass
    var entity_type = req.body.entity_type;
    var account_type = req.body.account_type;


    accountController.findOne({where: {email: email, entity_type: entity, account_type: type}}, account => {
      if (!account) {  // if user does not exist
        // create salt
        bcrypt.genSalt(12, function(err, salt) {
          // create password using salt
          bcrypt.hash(pass, salt, function(err, hash) {
            // put user in database
            accountController.create({
              email: email,
              entity_type: entity_type,
              account_type: account_type,
              hash: hash,
              salt: salt,
              publishable_test_api_key: 'testkey123'
            }, newAccount => {
              res.send('account created successfully')
            });
          });
        });
      } else {  //if user exists
        // tell client user already exists
        res.send({error: {
          type: 'authentication_error',
          message: 'account already exists'
        }});
      }
    });
  });

// Login platform account
accountRouter.route('/login')
  .post(function(req, res, next) {
    var platform = req.account;
    var accountInformation = {
      email: req.body.email,
      entity_type: req.body.entity_type,
      account_type: req.body.account_type,
      country: req.body.country || 'UAE'
    }
    
    platform.getConnectedAccount({where: accountInformation}).then(accounts => {
      if (accounts[0]) {
        res.send({message: 'account already connected'});
      } else if (accountInformation.account_type === 'standard') {
        // sendConnectionInvite(accountInformation.email)
        res.send('connection invite sent')
      } else {
        accountController.create(accountInformation, newAccount => {
          platform.addConnectedAccount(newAccount).then(() => {
            res.send('Account created successfully')
          })
        })
      }
    })
  });

// Get connected account information
accountRouter.route('/:accountId')
  .get(function(req, res) {
    var platform = req.account;
    var accountId = req.params.accountId;

    platform.getConnectedAccount({where: {id: accountId}}).then(accounts => {
      if (accounts[0]){
        res.send(accounts[0])
      } else {
        res.send('No connected accounts found with that id');
      }
    })
  })
  

// Update connected account
accountRouter.route('/:accountId')
  .post(function(req, res) {
    var platform = req.account;
    var accountId = req.params.accountId;

    platform.getConnectedAccount({where: {id: accountId}}).then(accounts => {
      if (accounts[0]) {
        if (accounts[0].account_type === 'custom') {
          Account.update(req.body, {where: {id: accountId}}).then(updatedAccount => {
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
accountRouter.route('/:accountId/reject')
  .get((req, res) => {
    var platform = req.account;
    var accountId = req.params.accountId;
    var reason = req.body.reason;

    platform.getConnectedAccount({where: {id: accountId}}).then(accounts => {
      var account = accounts[0];
      if (account){
        platform.setConnectedAccount(account, {rejected: true, rejected_reason: reason, transfers_enabled: false, charges_enabled: false})
      } else {
        res.send('No connected accounts found with that id');
      }
    })
  });

// List all connected accounts
accountRouter.route('/')
  .get((req, res) => {
    var queryLimit = parseInt(req.query.limit) || null
    var platform = req.account;

    platform.getConnectedAccount({limit: queryLimit}).then(accounts => {
      res.send(accounts)
    })
  });

module.exports = accountRouter;

