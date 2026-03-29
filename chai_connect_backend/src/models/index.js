const sequelize = require('../config/database');
const Farmer = require('./Farmer');
const Delivery = require('./Delivery');
const Loan = require('./Loan');
const Payment = require('./Payment');

// 1. Farmer & Deliveries
Farmer.hasMany(Delivery);
Delivery.belongsTo(Farmer);

// 2. Farmer & Loans
Farmer.hasMany(Loan);
Loan.belongsTo(Farmer);

// 3. Farmer & Payments (General payouts)
Farmer.hasMany(Payment);
Payment.belongsTo(Farmer);

// 4. Loan & Payments (Linking repayments to a specific loan)
Loan.hasMany(Payment);
Payment.belongsTo(Loan);

module.exports = {
  sequelize,
  Farmer,
  Delivery,
  Loan,
  Payment
};