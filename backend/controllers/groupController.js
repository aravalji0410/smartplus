const groupModel = require("../models/groupModel");

// CREATE GROUP
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.userId;

    const result = await groupModel.createGroup(name, userId);
    const groupId = result.insertId;

    // add creator as member
    await groupModel.addMember(groupId, userId);

    res.status(201).json({
      message: "Group created",
      groupId: groupId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET GROUPS
exports.getGroups = async (req, res) => {
  try {
    const results = await groupModel.getUserGroups(req.userId);
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ONE
exports.getGroup = async (req, res) => {
  try {
    const results = await groupModel.getGroupById(req.params.id);
    if (!results || results.length === 0) return res.status(404).json({ msg: "Group not found" });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
exports.updateGroup = async (req, res) => {
  try {
    const result = await groupModel.updateGroup(req.params.id, req.body.name);
    if (result.affectedRows === 0) return res.status(404).json({ msg: "Group not found" });
    res.json({ message: "Group updated" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
exports.deleteGroup = async (req, res) => {
  try {
    const result = await groupModel.deleteGroup(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ msg: "Group not found" });
    res.json({ message: "Group deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};