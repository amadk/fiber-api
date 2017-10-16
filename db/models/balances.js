module.exports = function(sequelize, Sequelize) {

  var Balance = sequelize.define('balances', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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