// Create a new group
exports.createGroup = async (req, res) => {
  // Get group name from request body
  const { groupName } = req.body;

  // Get logged-in user ID from auth middleware
  const userId = req.user.id;

  // Insert new group into database
  const [result] = await db.query(
    "INSERT INTO Groups (groupName, createdBy) VALUES (?, ?)",
    [groupName, userId]
  );

  // Get newly created group ID
  const groupId = result.insertId;

  // Add the creator as a member of the group
  await db.query(
    "INSERT INTO GroupMembers (groupId, userId) VALUES (?, ?)",
    [groupId, userId]
  );

  // Send response with group ID
  res.json({ groupId });
};

// Add a new member to a group
exports.addMember = async (req, res) => {
  // Get group ID and user ID from request body
  const { groupId, userId } = req.body;

  // Insert user into GroupMembers table
  await db.query(
    "INSERT INTO GroupMembers (groupId, userId) VALUES (?, ?)",
    [groupId, userId]
  );

  // Send success message
  res.json({ message: "Member added" });
};

// Get all groups for logged-in user
exports.getGroups = async (req, res) => {
  // Get logged-in user ID
  const userId = req.user.id;

  // Fetch groups where user is a member
  const [rows] = await db.query(
    `SELECT g.* FROM Groups g
     JOIN GroupMembers gm ON g.groupId = gm.groupId
     WHERE gm.userId = ?`,
    [userId]
  );

  // Return list of groups
  res.json(rows);
};