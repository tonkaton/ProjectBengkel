// models/Reward.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Reward = sequelize.define(
  "Reward",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3, 100] },
    },
    points_needed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      validate: { min: 0 },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // optional: gambar reward atau icon
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "rewards",
    timestamps: true,
  },
);

module.exports = Reward;
