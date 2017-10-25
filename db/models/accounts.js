var uuidv4 = require('uuid/v4');

module.exports = function(sequelize, Sequelize) {

  var Account = sequelize.define('accounts', {
    id: {
      type: Sequelize.UUID,
      defaultValue: () => {
        var arr = uuidv4().split('-');
        arr.pop();
        return 'acct_'+arr.join('');
      },
      primaryKey: true,
      allowNull: false,
    },
    // ----------------------------------------------------------- Account Type ------------------------------------------------------------------
    account_type:{
      type: Sequelize.STRING
    },
    entity_type: {
      type: Sequelize.STRING
    },
    // ----------------------------------------------------------- Personal Information ----------------------------------------------------------
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    dob_day: {
      type: Sequelize.INTEGER
    },
    dob_month: {
      type: Sequelize.INTEGER
    },
    dob_year: {
      type: Sequelize.INTEGER
    },
    phone_number: {
      type: Sequelize.STRING
    },
    // ----------------------------------------------------------- Business Information ----------------------------------------------------------
    business_name: {
      type: Sequelize.STRING
    },
    business_information: {
      type: Sequelize.STRING
    },
    business_type: {
      type: Sequelize.STRING
    },
    business_url: {
      type: Sequelize.STRING
    },
    // ----------------------------------------------------------- Address Information -----------------------------------------------------------
    country: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    address_line1: {
      type: Sequelize.STRING
    },
    address_line2: {
      type: Sequelize.STRING
    },
    // ----------------------------------------------------------- Verification ------------------------------------------------------------------
    details_submitted: {
      type: Sequelize.BOOLEAN
    },
    verification_status: {
      type: Sequelize.STRING
    },
    fields_needed: {
      type: Sequelize.STRING
    },
    tos_acceptance_date: {
      type: Sequelize.STRING
    },
    tos_acceptance_ip: {
      type: Sequelize.STRING
    },
    // ----------------------------------------------------------- Extra Information -------------------------------------------------------------
    display_name: {
      type: Sequelize.STRING
    },
    default_currency: {
      type: Sequelize.STRING
    },
    charges_enabled: {
      type: Sequelize.BOOLEAN
    },
    payouts_enabled: {
      type: Sequelize.BOOLEAN
    },
    default_payment_source: {
      type: Sequelize.STRING
    },
    default_payout_destination: {
      type: Sequelize.STRING
    },
    // ----------------------------------------------------------- API Keys -------------------------------------------------------------
    pk_test_apikey: {
      type: Sequelize.TEXT,
      defaultValue: () => {
        return 'pk_test_'+uuidv4().split('-').join('');
      },
      allowNull: false,
    },
    sk_test_apikey: {
      type: Sequelize.TEXT,
      defaultValue: () => {
        return 'sk_test_'+uuidv4().split('-').join('');
      },
      allowNull: false,
    },
    pk_live_apikey: {
      type: Sequelize.TEXT,
      defaultValue: () => {
        return 'pk_live_'+uuidv4().split('-').join('');
      },
      allowNull: false,
    },
    sk_live_apikey: {
      type: Sequelize.TEXT,
      defaultValue: () => {
        return 'sk_live_'+uuidv4().split('-').join('');
      },
      allowNull: false,
    }
  });

  return Account;
};