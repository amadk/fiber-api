module.exports = function(sequelize, Sequelize) {

  var Account = sequelize.define('accounts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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
    // ----------------------------------------------------------- API Keys ----------------------------------------------------------------------
    publishable_live_api_key: {
      type: Sequelize.STRING
    },
    publishable_test_api_key: {
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
  });

  return Account;
};