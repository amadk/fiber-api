const CustomerCardToken = require('../models/index.js').CustomerCardToken;

CustomerCardToken.create = (props, callback) => {
  Balance.build(props)
  .save()
  .then(customerCardToken => {
    callback(customerCardToken);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findAll = (query, callback) => {
  CustomerCardToken.findAll(query)
  .then(customerCardTokens => {
    callback(customerCardTokens);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findOne = (query, callback) => {
  CustomerCardToken.findOne(query)
  .done(customerCardToken => {
    callback(customerCardToken);
  });
};
