const Expense = require("../models/expenseModel");

// create expense
exports.createExpense = async (req, res) => {
  try {
    const { groupId, paidBy, amount, splitType, category, date } = req.body;
    const expense = await Expense.create({
      groupId,
      paidBy,
      amount,
      splitType,
      category,
      date
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Expense.update(req.body, { where: { expenseId: id } });
    if (updated[0] === 0) return res.status(404).json({ msg: "Expense not found" });
    res.json({ msg: "Expense updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.destroy({ where: { expenseId: id } });
    if (!deleted) return res.status(404).json({ msg: "Expense not found" });
    res.json({ msg: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
