const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Expense = sequelize.define("Expense", {
  expenseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  paidBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  splitType: DataTypes.STRING,
  category: DataTypes.STRING,
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Expense;