const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  transactionId: { type: DataTypes.STRING, unique: true }, // M-PESA Receipt
  status: { 
    type: DataTypes.ENUM('Pending', 'Completed', 'Failed'), 
    defaultValue: 'Pending' 
  },
  paymentType: { 
    type: DataTypes.ENUM('Produce_Payment', 'Loan_Disbursement', 'Loan_Repayment'),
    allowNull: false 
  }
});

module.exports = Payment;