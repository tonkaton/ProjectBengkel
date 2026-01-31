// models/Vehicle.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Vehicle = sequelize.define(
  "Vehicle",
  {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 50] },
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 50] },
    },
    plate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [5, 15] },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1900, max: new Date().getFullYear() + 1 },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // optional: foto motor kalau nanti mau upload
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "vehicles",
    timestamps: true,
  },
);

// Relasi
Vehicle.belongsTo(User, {
  foreignKey: "UserId",
  as: "owner",
});

User.hasMany(Vehicle, {
  foreignKey: "UserId",
  as: "vehicles",
});

module.exports = Vehicle;
