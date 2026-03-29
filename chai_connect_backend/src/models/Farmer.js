const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Farmer = sequelize.define('Farmer', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  farmerId: { type: DataTypes.STRING, unique: true, allowNull: false }, // e.g., WK001
  fullName: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, unique: true, allowNull: false }, // 2547...
  nationalId: { type: DataTypes.STRING, unique: true, allowNull: false },
  factoryName: { type: DataTypes.STRING, allowNull: false },
  creditScore: { type: DataTypes.INTEGER, defaultValue: 50 }, // 0 to 100
  status: { type: DataTypes.ENUM('Active', 'Suspended'), defaultValue: 'Active' }
});

module.exports = Farmer;