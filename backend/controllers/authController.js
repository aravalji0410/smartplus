const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO Users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.json({ msg: "User registered" });

  } catch (err) {
    res.status(500).json({ msg: "Error registering user" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign({ id: user.userId }, "secretkey");

    res.json({ token });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};