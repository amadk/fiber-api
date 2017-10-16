const Card = require('../models/index.js').Card;

Card.create = (props, callback) => {
  Balance.build(props)
  .save()
  .then(card => {
    callback(card);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findAll = (query, callback) => {
  Card.findAll(query)
  .then(cards => {
    callback(cards);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.findOne = (query, callback) => {
  Card.findOne(query)
  .done(card => {
    callback(card);
  });
};
