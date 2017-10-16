// This file makes all join table relationships
const Sequelize = require('sequelize');

var db = process.env.DB;
var dbUser = process.env.DBUSER;
var dbPassword = process.env.DBPASSWORD;
var dbHost = process.env.DBHOST;

const sequelize = new Sequelize(db, dbUser, dbPassword, {
  dialect: 'mysql',
  host: dbHost,
  logging: false
});

// Any variable that starts with a capital letter is a model
const Account = require('./accounts.js')(sequelize, Sequelize);
const ConnectedAccount = require('./connected_accounts.js')(sequelize, Sequelize);

const Balance = require('./balances.js')(sequelize, Sequelize);
// const BalanceTransaction = require('./balance_transactions.js')(sequelize, Sequelize);

const Customer = require('./customers.js')(sequelize, Sequelize);
const Charge = require('./charges.js')(sequelize, Sequelize);
const CustomerCardToken = require('./customer_card_tokens.js')(sequelize, Sequelize);

// const Transfer = require('./transfers.js')(sequelize, Sequelize);
// const Payout = require('./payouts.js')(sequelize, Sequelize);

const Card = require('./cards.js')(sequelize, Sequelize);
// const BankAccountToken = require('./bank_account_tokens.js')(sequelize, Sequelize);

// -----------------------------------------------------Accounts-----------------------------------------------------------------------------------

Account.belongsToMany(Account, {
  through: ConnectedAccount,
  as: 'connectedAccount',
  foreignKey: 'platform_id'
});

Account.belongsToMany(Account, {
  through: ConnectedAccount,
  as: 'platform',
  foreignKey: 'connected_account_id'
})

// -----------------------------------------------------Accounts-----------------------------------------------------------------------------------


// User-Product relationship:
Account.hasMany(Balance, {
  foreignKey: 'account_id'
});

Balance.belongsTo(Account, {
  foreignKey: 'account_id'
});

// Product-ProductPhotos relationship:
Account.hasMany(Card, {
  foreignKey: 'account_id'
});

Card.belongsTo(Account, {
  foreignKey: 'account_id'
});

// Product-ProductPhotos relationship:
Account.hasMany(Customer, {
  foreignKey: 'platform_id'
});

Customer.belongsTo(Account, {
  foreignKey: 'platform_id'
});

// Product-ProductPhotos relationship:
Customer.hasMany(CustomerCardToken, {
  foreignKey: 'customer_id'
});

CustomerCardToken.belongsTo(Customer, {
  foreignKey: 'platform_id'
});

// -----------------------------------------------------Charges-----------------------------------------------------------------------------------

// Product-ProductPhotos relationship:
Card.hasMany(Charge, {
  foreignKey: 'source'
});

Charge.belongsTo(Card, {
  foreignKey: 'source'
});

// Product-ProductPhotos relationship:
CustomerCardToken.hasMany(Charge, {
  foreignKey: 'source'
});

Charge.belongsTo(CustomerCardToken, {
  foreignKey: 'source'
});

// Product-ProductPhotos relationship:
Account.hasMany(Charge, {
  foreignKey: 'platform_id'
});

Charge.belongsTo(Account, {
  foreignKey: 'platform_id'
});

// Product-ProductPhotos relationship:
Customer.hasMany(Charge, {
  foreignKey: 'customer_id'
});

Charge.belongsTo(Customer, {
  foreignKey: 'customer_id'
});

// -----------------------------------------------------Charges-----------------------------------------------------------------------------------


// Product-ProductSizes relationship:
// Account.hasMany(BankAccountToken, {
//   foreignKey: 'account_id'
// });

// BankAccountToken.belongsTo(Account, {
//   foreignKey: 'account_id'
// });


// AppLinks join table:
// App.belongsToMany(Link, {
//   through: 'app_links',
//   foreignKey: 'app_id'
// });

// Link.belongsToMany(App, {
//   through: 'app_links',
//   foreignKey: 'link_id'
// });


// Create missing tables, if any
// sequelize.sync({force: true});
sequelize.sync();

exports.Account = Account;
exports.ConnectedAccount = ConnectedAccount;

exports.Card = Card;

exports.Balance = Balance;
exports.Customer = Customer;
exports.CustomerCardToken = CustomerCardToken;
exports.Charge = Charge;
// exports.BankAccountToken = BankAccountToken;



