var uuidv4 = require('uuid/v4');

module.exports = function(sequelize, Sequelize) {

  var Transfer = sequelize.define('transfers', {
    id: {
      type: Sequelize.UUID,
      defaultValue: () => {
        var arr = uuidv4().split('-');
        arr.pop();
        return 'tr_'+arr.join('');
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
    description: {
      type: Sequelize.STRING
    }
  });

  return Transfer;
};