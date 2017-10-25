var uuidv4 = require('uuid/v4');

module.exports = function(sequelize, Sequelize) {

  var BankAccount = sequelize.define('bankAccounts', {
    id: {
      type: Sequelize.UUID,
      defaultValue: () => {
        var arr = uuidv4().split('-');
        arr.pop();
        return 'ba_'+arr.join('');
      },
      primaryKey: true,
      allowNull: false,
    },
    account_holder_name: {
      type: Sequelize.STRING
    },
    account_holder_type: {
      type: Sequelize.STRING
    },
    bank_name: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    currency: {
      type: Sequelize.STRING
    },
    last4: {
      type: Sequelize.STRING
    },
    account_number: {
      type: Sequelize.STRING
    },
    iban_number: {
      type: Sequelize.STRING
    },
  });

  return BankAccount;
};