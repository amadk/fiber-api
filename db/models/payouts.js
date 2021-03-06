var uuidv4 = require('uuid/v4');

module.exports = function(sequelize, Sequelize) {

  var Payout = sequelize.define('payouts', {
    id: {
      type: Sequelize.UUID,
      defaultValue: () => {
        var arr = uuidv4().split('-');
        arr.pop();
        return 'po_'+arr.join('');
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
    destination: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Payout;
};