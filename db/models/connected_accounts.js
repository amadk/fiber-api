module.exports = function(sequelize, Sequelize) {

  var ConnectedAccount = sequelize.define('connected_accounts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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