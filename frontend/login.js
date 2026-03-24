const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);

  if (rows.length === 0) return res.status(400).json({ msg: "User not found" });

  const user = rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: user.userId }, "secretkey");

  res.json({ token });
};