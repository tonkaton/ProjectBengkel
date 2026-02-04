const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Proposal = require("./Proposal");

const ProposalItem = sequelize.define(
  "ProposalItem",
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false, // Contoh: "Piston Forged 66mm"
    },
    type: {
      type: DataTypes.ENUM("Part", "Service"),
      defaultValue: "Part",
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "proposal_items",
    timestamps: true,
  }
);

// Relasi: Satu Proposal punya banyak Item
Proposal.hasMany(ProposalItem, {
  foreignKey: "ProposalId",
  as: "items",
});

ProposalItem.belongsTo(Proposal, {
  foreignKey: "ProposalId",
  as: "proposal",
});

module.exports = ProposalItem;