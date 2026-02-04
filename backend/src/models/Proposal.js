const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Vehicle = require("./Vehicle");

const Proposal = sequelize.define(
  "Proposal",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Draft", "Sent", "Accepted", "Rejected", "Converted"),
      defaultValue: "Draft",
    },
    admin_note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    grand_total: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "proposals",
    timestamps: true,
  }
);

// Relasi ke User (Pemilik)
Proposal.belongsTo(User, {
  foreignKey: "UserId",
  as: "customer",
});
User.hasMany(Proposal, { foreignKey: "UserId" });

// Relasi ke Vehicle (Motor yang dimodif)
Proposal.belongsTo(Vehicle, {
  foreignKey: "VehicleId",
  as: "vehicle",
});
Vehicle.hasMany(Proposal, { foreignKey: "VehicleId" });

module.exports = Proposal;