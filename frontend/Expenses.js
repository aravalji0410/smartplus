exports.addExpense = async (req, res) => {
  const { groupId, amount, paidBy, participants } = req.body;

  const [result] = await db.query(
    "INSERT INTO Expenses (groupId, paidBy, amount, splitType) VALUES (?, ?, ?, 'equal')",
    [groupId, paidBy, amount]
  );

  const expenseId = result.insertId;

  const share = amount / participants.length;

  for (let userId of participants) {
    await db.query(
      "INSERT INTO ExpenseParticipants (expenseId, userId, share) VALUES (?, ?, ?)",
      [expenseId, userId, share]
    );
  }

  res.json({ message: "Expense added" });
};

exports.getExpenses = async (req, res) => {
  const { groupId } = req.params;

  const [rows] = await db.query(
    "SELECT * FROM Expenses WHERE groupId = ?",
    [groupId]
  );

  res.json(rows);
};