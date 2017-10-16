const Account = require('../models/index.js').Account;
const Balance = require('../models/index.js').Balance;

exports.create = (props, callback) => {
  Account.create(props)
  .then(account => {
    Balance.create({}).then(balance => {
      account.addBalance(balance).then((balance) => {
        callback(account); 
      })      
    })
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findAll = (query, callback) => {
  Account.findAll(query)
  .then(accounts => {
    callback(accounts);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findOne = (query, callback) => {
  Account.findOne(query)
  .done(account => {
    callback(account);
  });
};
