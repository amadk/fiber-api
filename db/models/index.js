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

const Account = require('./accounts.js')(sequelize, Sequelize);
const ConnectedAccount = require('./connected_accounts.js')(sequelize, Sequelize);

const Balance = require('./balances.js')(sequelize, Sequelize);
// const BalanceTransaction = require('./balance_transactions.js')(sequelize, Sequelize);

const Charge = require('./charges.js')(sequelize, Sequelize);

const Transfer = require('./transfers.js')(sequelize, Sequelize);
const Payout = require('./payouts.js')(sequelize, Sequelize);

const Card = require('./cards.js')(sequelize, Sequelize);
const BankAccount = require('./bankAccounts.js')(sequelize, Sequelize);

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
  foreignKey: 'account_id',
});

Card.belongsTo(Account, {
  foreignKey: 'account_id'
});

// Product-ProductPhotos relationship:
Account.hasMany(BankAccount, {
  foreignKey: 'account_id'
});

BankAccount.belongsTo(Account, {
  foreignKey: 'account_id'
});
// -----------------------------------------------------Charges-----------------------------------------------------------------------------------

// Product-ProductPhotos relationship:
Account.hasMany(Charge, {
  foreignKey: 'account_id'
});

Charge.belongsTo(Account, {
  foreignKey: 'account_id'
});

// -----------------------------------------------------Charges-----------------------------------------------------------------------------------


Account.belongsToMany(Account, {
  through: Transfer,
  as: 'sender',
  foreignKey: 'receiver_id'
});

Account.belongsToMany(Account, {
  through: Transfer,
  as: 'receiver',
  foreignKey: 'sender_id'
})

// Product-ProductPhotos relationship:
Account.hasMany(Payout, {
  foreignKey: 'account_id'
});

Payout.belongsTo(Account, {
  foreignKey: 'account_id'
});


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
sequelize.sync({force: true});
// sequelize.sync();

exports.Account = Account;
exports.ConnectedAccount = ConnectedAccount;

exports.Card = Card;
exports.BankAccount = BankAccount;

exports.Balance = Balance;
exports.Charge = Charge;
exports.Transfer = Transfer;
exports.Payout = Payout;


