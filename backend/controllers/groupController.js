const groupModel = require("../models/groupModel");

// CREATE GROUP
exports.createGroup = (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  groupModel.createGroup(name, userId, (err, result) => {
    if (err) return res.status(500).json(err);

    const groupId = result.insertId;

    // add creator as member
    groupModel.addMember(groupId, userId, () => {
      res.status(201).json({
        message: "Group created",
        groupId: groupId,
      });
    });
  });
};

// GET GROUPS
exports.getGroups = (req, res) => {
  groupModel.getUserGroups(req.user.id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// GET ONE
exports.getGroup = (req, res) => {
  groupModel.getGroupById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

// UPDATE
exports.updateGroup = (req, res) => {
  groupModel.updateGroup(req.params.id, req.body.name, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Group updated" });
  });
};

// DELETE
exports.deleteGroup = (req, res) => {
  groupModel.deleteGroup(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Group deleted" });
  });
};