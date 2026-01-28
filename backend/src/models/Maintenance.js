const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Maintenance = sequelize.define('Maintenance', {
  motor_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  next_service: {
    type: DataTypes.DATE,
    allowNull: false
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reminder_h7: { type: DataTypes.BOOLEAN, defaultValue: false },
  reminder_h3: { type: DataTypes.BOOLEAN, defaultValue: false },
  reminder_h1: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Maintenance.belongsTo(User, { 
  foreignKey: 'UserId',
  as: 'owner'
});

User.hasMany(Maintenance, { 
  foreignKey: 'UserId',
  as: 'maintenances'
});

module.exports = Maintenance;