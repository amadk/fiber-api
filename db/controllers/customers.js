const Customer = require('../models/index.js').Customer;

exports.create = (props, callback) => {
  Charge.build(props)
  .save()
  .then(customer => {
    callback(customer);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findAll = (query, callback) => {
  Customer.findAll(query)
  .then(customers => {
    callback(customers);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findOne = (query, callback) => {
  Customer.findOne(query)
  .done(customer => {
    callback(customer);
  });
};
