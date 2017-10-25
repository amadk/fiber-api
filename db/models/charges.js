var uuidv4 = require('uuid/v4');

module.exports = function(sequelize, Sequelize) {

  var Charge = sequelize.define('charges', {
    id: {
      type: Sequelize.UUID,
      defaultValue: () => {
        var arr = uuidv4().split('-');
        arr.pop();
        return 'ch_'+arr.join('');
      },
      primaryKey: true,
      allowNull: false,
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
    customer_id: {
      type: Sequelize.STRING
    },
    source: {
      type: Sequelize.STRING
    },
  });

  return Charge;
};