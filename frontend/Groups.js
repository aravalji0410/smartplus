exports.createGroup = async (req, res) => {
  const { groupName } = req.body;
  const userId = req.user.id;

  const [result] = await db.query(
    "INSERT INTO Groups (groupName, createdBy) VALUES (?, ?)",
    [groupName, userId]
  );

  const groupId = result.insertId;

  // Add creator as member
  await db.query(
    "INSERT INTO GroupMembers (groupId, userId) VALUES (?, ?)",
    [groupId, userId]
  );

  res.json({ groupId });
};

exports.addMember = async (req, res) => {
  const { groupId, userId } = req.body;

  await db.query(
    "INSERT INTO GroupMembers (groupId, userId) VALUES (?, ?)",
    [groupId, userId]
  );

  res.json({ message: "Member added" });
};

exports.getGroups = async (req, res) => {
  const userId = req.user.id;

  const [rows] = await db.query(
    `SELECT g.* FROM Groups g
     JOIN GroupMembers gm ON g.groupId = gm.groupId
     WHERE gm.userId = ?`,
    [userId]
  );

  res.json(rows);
};