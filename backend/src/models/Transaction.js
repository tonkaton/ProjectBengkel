const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Service = require("./Service");
const Proposal = require("./Proposal");

const Transaction = sequelize.define(
  "Transaction",
  {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
    points_earned: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("Menunggu", "Proses", "Selesai"),
      defaultValue: "Menunggu",
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // 👇 2. Tambahan Kolom buat Link ke Proposal
    ProposalId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "transactions",
    timestamps: true,
  },
);

Transaction.belongsTo(User, {
  foreignKey: "UserId",
  as: "customer",
});

User.hasMany(Transaction, {
  foreignKey: "UserId",
  as: "transactions",
});

Transaction.belongsTo(Service, {
  foreignKey: "ServiceId",
  as: "service",
});

Service.hasMany(Transaction, {
  foreignKey: "ServiceId",
  as: "transactions",
});

// 👇 3. Tambahan Relasi ke Proposal
Transaction.belongsTo(Proposal, {
  foreignKey: "ProposalId",
  as: "proposal",
});

Proposal.hasOne(Transaction, {
  foreignKey: "ProposalId",
  as: "transaction",
});

module.exports = Transaction;