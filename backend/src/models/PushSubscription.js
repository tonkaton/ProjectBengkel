const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const PushSubscription = sequelize.define(
  "PushSubscription",
  {
    subscription: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "pushsubscriptions",
    timestamps: true,
  },
);

PushSubscription.belongsTo(User, {
  foreignKey: "UserId",
  as: "user",
});

User.hasOne(PushSubscription, {
  foreignKey: "UserId",
  as: "pushSubscription",
});

module.exports = PushSubscription;
