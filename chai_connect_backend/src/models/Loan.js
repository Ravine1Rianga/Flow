const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Loan = sequelize.define('Loan', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  loanAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  interestRate: { type: DataTypes.DECIMAL(5, 2), defaultValue: 8.00 }, // e.g., 8%
  totalRepayable: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  remainingBalance: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { 
    type: DataTypes.ENUM('Active', 'Paid', 'Defaulted'), 
    defaultValue: 'Active' 
  },
  disbursementDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Loan;