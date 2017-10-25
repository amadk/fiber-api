var express = require('express');
var accountController = require('../../db/controllers/accounts.js');
var Account = require('../../db/models/index.js').Account;
var ConnectedAccount = require('../../db/models/index.js').ConnectedAccount;

var customerRouter = express.Router();

// Create customer account
customerRouter.route('/')
  .post(function(req, res, next) {
    var platform = req.account;
    var customerInformation = Object.assign(req.body)

    platform.getConnectedAccount({where: customerInformation}).then(customers => {
      if (customers[0]) {
        res.send({message: 'account already connected'});
      } else if (customerInformation.account_type === 'standard') {
        // sendConnectionInvite(accountInformation.email)
        res.send('connection invite sent')
      } else {
        accountController.create(customerInformation, newCustomer => {
          platform.addConnectedAccount(newCustomer, {through: {connection_type: 'platform-customer'}}).then(accountConnection => {
            res.send(newCustomer)
          })
        })
      }
    })
  });

// List all connected accounts
customerRouter.route('/')
  .get((req, res) => {
    var queryLimit = parseInt(req.query.limit) || 10
    var platform = req.account;

    platform.getConnectedAccount().then(customers => {

      customers = customers.filter(customer => {
        return customer.connected_accounts.connection_type === 'platform-customer'
      }).slice(0, queryLimit)

      res.send(customers)
    })
  });

// Get connected account information
customerRouter.route('/:customerId')
  .get(function(req, res) {
    var platform = req.account;
    var customerId = req.params.customerId;

    platform.getConnectedAccount({where: {id: customerId}}).then(customers => {
      if (customers[0]){
        res.send(customers[0])
      } else {
        res.send('No customers found with that id');
      }
    })
  })
  

// Update connected account
customerRouter.route('/:customerId')
  .post(function(req, res) {
    var platform = req.account;
    var customerId = req.params.customerId;

    platform.getConnectedAccount({where: {id: customerId}}).then(accounts => {
      var customer = accounts[0]
      if (customer) {
        if (customer.account_type === 'custom') {
          customer.update(req.body).then(updatedAccount => {
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
customerRouter.route('/:customerId/reject')
  .get((req, res) => {
    var platform = req.account;
    var customerId = req.params.customerId;
    var reason = req.body.reason;

    platform.getConnectedAccount({where: {id: customerId}}).then(accounts => {
      var account = accounts[0];
      if (account){
        platform.setConnectedAccount(accounts[0], {rejected: true, rejected_reason: reason, transfers_enabled: false, charges_enabled: false})
      } else {
        res.send('No connected accounts found with that id');
      }
    })
  });

module.exports = customerRouter;