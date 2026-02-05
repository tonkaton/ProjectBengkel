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
    // 👇 KOLOM BARU: Nomor Antrian (Format: YYYYMMDD-XXX)
    queue_number: {
      type: DataTypes.STRING,
      allowNull: true, // Boleh kosong (untuk data lama atau draft)
    },
    // 👇 Link ke Proposal (Fitur yang sudah ada)
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

// --- RELASI (TIDAK BERUBAH) ---

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

Transaction.belongsTo(Proposal, {
  foreignKey: "ProposalId",
  as: "proposal",
});

Proposal.hasOne(Transaction, {
  foreignKey: "ProposalId",
  as: "transaction",
});

module.exports = Transaction;