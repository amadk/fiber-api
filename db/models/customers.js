module.exports = function(sequelize, Sequelize) {

  var Customer = sequelize.define('customers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING
    },
    default_source: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    shipping: {
      type: Sequelize.STRING
    }
  });

  return Customer;
};