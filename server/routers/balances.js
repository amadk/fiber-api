var express = require('express');
var balanceController = require('../../db/controllers/balances.js');
var Balance = require('../../db/models/index.js').Balance;

var balanceRouter = express.Router();


// List all balances
balanceRouter.route('/')
  .get((req, res) => {
    var platform = req.account;
    var accountId = req.headers['fiber-account'];
    if (accountId) {
      platform.getConnectedAccount().then(accounts => {
        if (accounts.length > 0) {
          var account = accounts[0]
          if (account.account_type === 'custom') {
            account.getBalances().then(balances => {
              res.send(balances);
            })
          } else {
            res.send({
              error: {
                type: 'permission_error',
                message: 'You do not have permission to access this account'
              }
            })
          }
        } else {
          res.send({
            error: {
              message: 'No connected accounts found'
            }
          })
        }
      })
    } else {
      platform.getBalances().then(balances => {
        res.send(balances);
      })      
    }
  });



module.exports = balanceRouter;