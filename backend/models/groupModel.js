const db = require("../config/db");

// CREATE GROUP
exports.createGroup = async (name, userId) => {
  const sql = "INSERT INTO `groups` (name, created_by) VALUES (?, ?)";
  const [result] = await db.query(sql, { replacements: [name, userId] });
  return result;
};

// ADD CREATOR AS MEMBER
exports.addMember = async (groupId, userId) => {
  const sql = "INSERT INTO `group_members` (group_id, user_id) VALUES (?, ?)";
  const [result] = await db.query(sql, { replacements: [groupId, userId] });
  return result;
};

// GET USER GROUPS
exports.getUserGroups = async (userId) => {
  const sql = `
    SELECT g.* 
    FROM \`groups\` g
    JOIN \`group_members\` gm ON g.id = gm.group_id
    WHERE gm.user_id = ?
  `;
  const [results] = await db.query(sql, { replacements: [userId] });
  return results;
};

// GET GROUP BY ID
exports.getGroupById = async (id) => {
  const [results] = await db.query("SELECT * FROM `groups` WHERE id = ?", {
    replacements: [id],
  });
  return results;
};

// UPDATE GROUP
exports.updateGroup = async (id, name) => {
  const [result] = await db.query("UPDATE `groups` SET name=? WHERE id=?", {
    replacements: [name, id],
  });
  return result;
};

// DELETE GROUP
exports.deleteGroup = async (id) => {
  const [result] = await db.query("DELETE FROM `groups` WHERE id=?", {
    replacements: [id],
  });
  return result;
};