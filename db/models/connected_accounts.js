const uuidv4 = require('uuid/v4');

module.exports = function(sequelize, Sequelize) {

  var ConnectedAccount = sequelize.define('connected_accounts', {
    id: {
      type: Sequelize.UUID,
      defaultValue: () => {
        var arr = uuidv4().split('-');
        arr.pop();
        return 'ca_'+arr.join('');
      },
      primaryKey: true,
      allowNull: false,
    },
    transfers_enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    charges_enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    rejected: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    rejection_reason: {
      type: Sequelize.STRING
    },
    connection_type: {
      type: Sequelize.STRING
    }
  });

  return ConnectedAccount;
};