// models/LoyaltyPoint.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LoyaltyPoint = sequelize.define(
  "LoyaltyPoint",
  {
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },
  },
  {
    tableName: "loyaltypoints",
    timestamps: true,
  },
);

module.exports = LoyaltyPoint;
