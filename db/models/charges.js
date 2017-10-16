module.exports = function(sequelize, Sequelize) {

  var Charge = sequelize.define('charges', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    amount: {
      type: Sequelize.STRING
    },
    currency: {
      type: Sequelize.STRING
    },
    capture: {
      type: Sequelize.BOOLEAN
    },
    amount_refunded: {
      type: Sequelize.STRING
    },
    platform_fee: {
      type: Sequelize.STRING
    },
    balance_transaction: {
      type: Sequelize.STRING
    },
    receipt_email: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
  });

  return Charge;
};