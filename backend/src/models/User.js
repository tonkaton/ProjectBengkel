const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false 
  },
  role: { 
    type: DataTypes.ENUM('admin', 'user'), 
    defaultValue: 'user' 
  }
}, {
  timestamps: true,
  indexes: [
    { unique: true, fields: ['email'] }
  ]
});

const LoyaltyPoint = require('./LoyaltyPoint');
User.hasOne(LoyaltyPoint, { foreignKey: 'UserId', as: 'loyaltyPoints' });

module.exports = User;