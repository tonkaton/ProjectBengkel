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
    // One loyalty record per user — prevents duplicate rows (data integrity)
    // and makes findOrCreate concurrency-safe against double-insert races.
    indexes: [{ unique: true, fields: ["UserId"] }],
  },
);

module.exports = LoyaltyPoint;
