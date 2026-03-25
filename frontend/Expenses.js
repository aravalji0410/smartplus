// Add a new expense to a group
exports.addExpense = async (req, res) => {
  // Get data from request body
  const { groupId, amount, paidBy, participants } = req.body;

  // Insert expense into Expenses table
  const [result] = await db.query(
    "INSERT INTO Expenses (groupId, paidBy, amount, splitType) VALUES (?, ?, ?, 'equal')",
    [groupId, paidBy, amount]
  );

  // Get newly created expense ID
  const expenseId = result.insertId;

  // Calculate equal share for each participant
  const share = amount / participants.length;

  // Loop through participants and insert their share
  for (let userId of participants) {
    await db.query(
      "INSERT INTO ExpenseParticipants (expenseId, userId, share) VALUES (?, ?, ?)",
      [expenseId, userId, share]
    );
  }

  // Send success response
  res.json({ message: "Expense added" });
};

// Get all expenses for a specific group
exports.getExpenses = async (req, res) => {
  // Get group ID from request parameters
  const { groupId } = req.params;

  // Fetch all expenses related to the group
  const [rows] = await db.query(
    "SELECT * FROM Expenses WHERE groupId = ?",
    [groupId]
  );

  // Return expenses list
  res.json(rows);
};