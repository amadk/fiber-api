module.exports = function(sequelize, Sequelize) {

  var CustomerCardToken = sequelize.define('customer_card_tokens', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    token: {
      type: Sequelize.STRING
    }
  });

  return CustomerCardToken;
};