const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// MySQL Connection (with SSL)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  ssl: {
    rejectUnauthorized: false
  }
});


// Connect
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err);
    return;
  }

  console.log("✅ MySQL Connected Successfully");
});


// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Smart+ API Running (MySQL + Aiven)" });
});


// Example API
app.get("/users", (req, res) => {
  db.query("SELECT * FROM Users", (err, rows) => {
    if (err) return res.status(500).json(err);

    res.json(rows);
  });
});

// Example API
app.post("/users/create", (req, res) => {
  db.query("INSERT INTO Users (name, student_id, course) VALUES (?, ?, ?)", [req.body.name, req.body.student_id, req.body.course], (err, rows) => {
    if (err) return res.status(500).json(err);

    res.json(rows);
  });
});

app.put("/users/update/:id", (req, res) => {
  const userId = req.params.id;
  // console.log("Updating user with ID:", userId);
  const { name, student_id, course } = req.body;
  // console.log("Received data for update:", { name, student_id, course });  
  db.query("UPDATE Users SET name = ?, student_id = ?, course = ? WHERE id = ?", [name, student_id, course, userId], (err, rows) => {
    if (err) return res.status(500).json(err);  
    res.json(rows);
  });
});

app.delete("/users/delete/:id", (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM Users WHERE id = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json(err);  
    res.json(rows);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
