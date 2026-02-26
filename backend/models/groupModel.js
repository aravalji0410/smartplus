const db = require("../config/db");

// CREATE GROUP
exports.createGroup = (name, userId, callback) => {
  const sql = "INSERT INTO groups (name, created_by) VALUES (?, ?)";
  db.query(sql, [name, userId], callback);
};

// ADD CREATOR AS MEMBER
exports.addMember = (groupId, userId, callback) => {
  const sql = "INSERT INTO group_members (group_id, user_id) VALUES (?, ?)";
  db.query(sql, [groupId, userId], callback);
};

// GET USER GROUPS
exports.getUserGroups = (userId, callback) => {
  const sql = `
    SELECT g.* 
    FROM groups g
    JOIN group_members gm ON g.id = gm.group_id
    WHERE gm.user_id = ?
  `;
  db.query(sql, [userId], callback);
};

// GET GROUP BY ID
exports.getGroupById = (id, callback) => {
  db.query("SELECT * FROM groups WHERE id = ?", [id], callback);
};

// UPDATE GROUP
exports.updateGroup = (id, name, callback) => {
  db.query("UPDATE groups SET name=? WHERE id=?", [name, id], callback);
};

// DELETE GROUP
exports.deleteGroup = (id, callback) => {
  db.query("DELETE FROM groups WHERE id=?", [id], callback);
};