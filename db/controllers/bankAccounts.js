const BankAccount = require('../models/index.js').BankAccount;

exports.create = (props, callback) => {
  Balance.build(props)
  .save()
  .then(bankAccount => {
    callback(bankAccount);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findAll = (query, callback) => {
  BankAccount.findAll(query)
  .then(bankAccounts => {
    callback(bankAccounts);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findOne = (query, callback) => {
  BankAccount.findOne(query)
  .done(bankAccount => {
    callback(bankAccount);
  });
};
