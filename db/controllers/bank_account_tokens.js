const BankAccountToken = require('../models/index.js').BankAccountToken;

BankAccountToken.create = (props, callback) => {
  Balance.build(props)
  .save()
  .then(bankAccountToken => {
    callback(bankAccountToken);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findAll = (query, callback) => {
  BankAccountToken.findAll(query)
  .then(bankAccountTokens => {
    callback(bankAccountTokens);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findOne = (query, callback) => {
  BankAccountToken.findOne(query)
  .done(bankAccountToken => {
    callback(bankAccountToken);
  });
};
