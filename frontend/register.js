const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed]
  );

  res.json({ message: "User registered" });
};