const bcrypt = require("bcryptjs");

// Register new user
exports.register = async (req, res) => {
  
  // Extract user input from request body
  const { name, email, password } = req.body;

  // Hash the password for security before storing in database
  const hashed = await bcrypt.hash(password, 10);

  // Insert new user into Users table
  await db.query(
    "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed]
  );

  // Send success response
  res.json({ message: "User registered" });
};