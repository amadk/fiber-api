const express = require('express')
const app = express()
var auth = require('basic-auth')
require('dotenv').config();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var accountController = require('../db/controllers/accounts.js');

var accountRouter = require('./routers/accounts.js');
var balanceRouter = require('./routers/balances.js');
var recipientRouter = require('./routers/recipients.js');
var customerRouter = require('./routers/customers.js');
var cardRouter = require('./routers/cards.js');
var bankAccountRouter = require('./routers/bankAccounts.js');
var chargeRouter = require('./routers/charges.js');
var transferRouter = require('./routers/transfers.js');
var payoutRouter = require('./routers/payouts.js');


var ConnectedAccount = require('../db/models/index.js').ConnectedAccount;
var Account = require('../db/models/index.js').Account;
var cmd = require('node-cmd');

var apiKeyAuthentication = function (req, res, next) {
  var credentials = auth(req);

  // forward api key to processor for verification
  // if response is error or failed authentication, forward response to requester
  // else if response is verified, perform next action
}

var prefillData = function(req, res, next) {
  Account.findAll().then(accounts => {
    console.log(accounts.length)
    if (accounts.length > 1) {
      req.account = accounts[1];
      next();
    } else {
      accountController.create(account1, newAccount1 => {
        accountController.create(platform, newPlatform => {
          accountController.create(account3, newAccount3 => {
            
            newAccount1.addPlatform(newPlatform).then(accountConnection => {
              accountConnection[0][0].update({'connection_type': 'platform-admin'}).then(() => {

                newPlatform.getBalances({where: {currency: 'aed'}}).then(balances => {
                  var platformBalance = balances[0];
                  platformBalance.update({available_amount: 1000000000}).then(newPlatformBalance => {


                    newPlatform.addConnectedAccount(newAccount3).then(accountConnection2 => {
                      accountConnection2[0][0].update({'connection_type': 'platform-recipient'}).then(() => {

                        console.log('New accounts created and connected !!!!!!!!!!!!!!!!!!!!!!!!')
                        req.account = newPlatform
                        next();
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    }    
  })
}

var account1 = {
  email: 'amadxk@gmail.com',
  account_type: 'standard',
  entity_type: 'individual',
  country: 'UAE',
  verification_status: 'verified',
}

var platform = {
  account_type: 'standard',
  entity_type: 'business',
  country: 'UAE',
  verification_status: 'verified',
}

var account3 = {
  email: 'other@gmail.com',
  account_type: 'custom',
  entity_type: 'business',
  country: 'UAE',
  verification_status: 'verified',
}




// app.use('/', apiKeyAuthentication);
app.use('/', prefillData);

app.use('/accounts', accountRouter);
app.use('/balances', balanceRouter);
app.use('/recipients', recipientRouter);
app.use('/customers', customerRouter);
app.use('/cards', cardRouter);
app.use('/bank_accounts', bankAccountRouter);
app.use('/charges', chargeRouter);
app.use('/transfers', transferRouter);
app.use('/payouts', payoutRouter);



app.listen(3000, function () {
  console.log('App listening on port 3000!')
  // cmd.get('mocha tests/index.js', function (err, data) {
    // console.log('running tests', data)
  // })
})

