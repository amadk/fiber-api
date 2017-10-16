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
var cardRouter = require('./routers/cards.js');

var ConnectedAccount = require('../db/models/index.js').ConnectedAccount;
var Account = require('../db/models/index.js').Account;

var apiKeyAuthentication = function (req, res, next) {
  var credentials = auth(req);

  // forward api key to processor for verification
  // if response is error or failed authentication, forward response to requester
  // else if response is verified, perform next action
}

var prefillData = function(req, res, next) {
  accountController.findOne({where: {id: 1}}, account => {
    if (account) {
      req.account = account;
      next();
    } else {
      accountController.create(account1, newAccount1 => {
        accountController.create(account2, newAccount2 => {
          accountController.create(account3, newAccount3 => {
            
            newAccount1.addPlatform(newAccount2).then(accountConnection => {
              accountConnection[0][0].update({connection_type: 'platform_admin'}).then(() => {

                newAccount2.addPlatform(newAccount3).then(accountConnection2 => {
                  accountConnection2[0][0].update({connection_type: 'platform_recipient'}).then(() => {

                    console.log('New accounts created and connected !!!!!!!!!!!!!!!!!!!!!!!!')
                    req.account = newAccount1
                    next();              
                    
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

var account2 = {
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
app.use('/cards', cardRouter);


app.listen(3000, function () {
  console.log('App listening on port 3000!')
})

