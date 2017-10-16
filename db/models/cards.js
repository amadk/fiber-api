module.exports = function(sequelize, Sequelize) {

  var CardToken = sequelize.define('card_tokens', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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
      type: Sequelize.STRING
    },
    exp_year: {
      type: Sequelize.STRING
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
    }
  });

  return CardToken;
};