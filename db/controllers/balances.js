const Balance = require('../models/index.js').Balance;

exports.create = (props, callback) => {
  Balance.build(props)
  .save()
  .then(balance => {
    callback(balance);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findAll = (query, callback) => {
  Balance.findAll(query)
  .then(balances => {
    callback(balances);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findOne = (query, callback) => {
  Balance.findOne(query)
  .done(balance => {
    callback(balance);
  });
};
