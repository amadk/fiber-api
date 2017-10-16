const Charge = require('../models/index.js').Charge;

exports.create = (props, callback) => {
  Charge.build(props)
  .save()
  .then(charge => {
    callback(charge);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findAll = (query, callback) => {
  Charge.findAll(query)
  .then(charges => {
    callback(charges);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findOne = (query, callback) => {
  Charge.findOne(query)
  .done(charge => {
    callback(charge);
  });
};
