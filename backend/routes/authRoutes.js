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