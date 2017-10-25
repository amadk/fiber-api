var express = require('express');
var bankAccountController = require('../../db/controllers/bankAccounts.js');
var BankAccount = require('../../db/models/index.js').BankAccount;

var bankAccountRouter = express.Router();


// Create bankAccount
bankAccountRouter.route('/')
  .post((req, res) => {
    var platform = req.account;
    // var bankAccountData = generateTokenAndUploadtoVault(req.body);
    var bankAccountData = Object.assign(req.body)

    BankAccount.create(bankAccountData).then(bankAccount => {
      platform.addBankAccount(bankAccount).then(account => {
        if (!platform.default_payout_destination) {
          platform.update({default_payout_destination: bankAccount.id}).then(account => {
            res.send(bankAccount);            
          })
        } else {
          res.send(bankAccount)
        }
      })
    })
  });

// Get bankAccounts
bankAccountRouter.route('/')
  .get((req, res) => {
    var platform = req.account;
    var queryLimit = parseInt(req.query.limit) || 10

    platform.getBankAccounts({limit: queryLimit}).then(bankAccounts => {
      res.send(bankAccounts)
    })
  });


// Get bankAccount with bankAccountId
bankAccountRouter.route('/:bankAccountId')
  .get((req, res) => {
    var platform = req.account;
    var bankAccountId = req.params.bankAccountId

    platform.getBankAccounts({where: {id: bankAccountId}}).then(bankAccounts => {
      res.send(bankAccounts[0])
    })
  });

// Update bankAccount
bankAccountRouter.route('/:bankAccountId')
  .post((req, res) => {
    var platform = req.account;
    // var bankAccountData = generateTokenAndUploadtoVault(req.body);
    var bankAccountId = req.params.bankAccountId;

    platform.getBankAccounts({where: {id: bankAccountId}}).then(bankAccounts => {
      var bankAccount = bankAccounts[0]
      if (bankAccount) {
        bankAccount.update(req.body).then(bankAccount => {
          res.send(bankAccount)          
        })
      } else {
        res.send({
          error: {
            type: 'not_found_error',
            message: 'No bankAccount found'
          }
        })
      }
    })
  });



module.exports = bankAccountRouter;