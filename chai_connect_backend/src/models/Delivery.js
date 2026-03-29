const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Delivery = sequelize.define('Delivery', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  weight: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // kgs
  deliveryDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  qualityGrade: { type: DataTypes.STRING }, // A, B, C
  unitPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // Price per kg at time of delivery
  totalValue: { 
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'weight * unitPrice'
  }
});

module.exports = Delivery;