const jwt = require("jsonwebtoken");

// User login function
exports.login = async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  // Check if user exists in database
  const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);

  // If no user found, return error
  if (rows.length === 0) {
    return res.status(400).json({ msg: "User not found" });
  }

  // Get user data
  const user = rows[0];

  // Compare entered password with stored hashed password
  const match = await bcrypt.compare(password, user.password);

  // If password does not match, return error
  if (!match) {
    return res.status(400).json({ msg: "Wrong password" });
  }

  // Generate JWT token with user ID
  const token = jwt.sign({ id: user.userId }, "secretkey");

  // Send token as response
  res.json({ token });
};