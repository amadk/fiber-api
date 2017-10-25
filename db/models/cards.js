var uuidv4 = require('uuid/v4');

module.exports = function(sequelize, Sequelize) {

  var Card = sequelize.define('cards', {
    id: {
      type: Sequelize.UUID,
      defaultValue: () => {
        var arr = uuidv4().split('-');
        arr.pop();
        return 'card_'+arr.join('');
      },
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING
    },
    last4: {
      type: Sequelize.STRING
    },
    brand: {
      type: Sequelize.STRING
    },
    exp_month: {
      type: Sequelize.INTEGER
    },
    exp_year: {
      type: Sequelize.INTEGER
    },
    cvc_check: {
      type: Sequelize.STRING
    },
    card_type: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    address_city: {
      type: Sequelize.STRING
    },
    address_country: {
      type: Sequelize.STRING
    },
    addresS_line1: {
      type: Sequelize.STRING
    },
    address_line1_check: {
      type: Sequelize.STRING
    },
    address_line2: {
      type: Sequelize.STRING
    },
    address_state: {
      type: Sequelize.STRING
    },
    address_zip: {
      type: Sequelize.STRING
    },
    address_zip_check: {
      type: Sequelize.STRING
    },

    number: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    cvc: {
      type: Sequelize.INTEGER
    },
  });

  return Card;
};