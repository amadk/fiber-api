var uuidv4 = require('uuid/v4');

module.exports = function(sequelize, Sequelize) {

  var Balance = sequelize.define('balances', {
    id: {
      type: Sequelize.UUID,
      defaultValue: () => {
        var arr = uuidv4().split('-');
        arr.pop();
        return 'bal_'+arr.join('');
      },
      primaryKey: true,
      allowNull: false,
    },
    available_amount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    pending_amount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    currency: {
      type: Sequelize.STRING,
      defaultValue: 'aed'
    },
  });

  return Balance;
};