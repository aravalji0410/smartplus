const db = require("../config/db");

exports.getSettlements = async (req, res) => {
  const { groupId } = req.params;

  try {
    // Total paid per user
    const [paid] = await db.query(
      `SELECT paidBy as userId, SUM(amount) as totalPaid
       FROM Expenses
       WHERE groupId = ?
       GROUP BY paidBy`,
      [groupId]
    );

    // Total owed per user
    const [owed] = await db.query(
      `SELECT ep.userId, SUM(ep.share) as totalOwed
       FROM ExpenseParticipants ep
       JOIN Expenses e ON ep.expenseId = e.expenseId
       WHERE e.groupId = ?
       GROUP BY ep.userId`,
      [groupId]
    );

    let balances = {};

    paid.forEach(p => {
      balances[p.userId] = (balances[p.userId] || 0) + p.totalPaid;
    });

    owed.forEach(o => {
      balances[o.userId] = (balances[o.userId] || 0) - o.totalOwed;
    });

    res.json(balances);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};