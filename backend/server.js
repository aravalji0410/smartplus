require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db"); // Sequelize instance

const app = express();
app.use(cors());
app.use(express.json());

// Routes
try {
  app.use("/api/auth", require("./routes/authRoutes"));
  app.use("/api/groups", require("./routes/groupRoutes"));
  app.use("/api/expenses", require("./routes/expenseRoutes"));
} catch (err) {
  console.error("Route loading error:", err);
}

// Health check
app.get("/", (req, res) => res.send("Smart+ API running"));

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Connect to DB
  try {
    await sequelize.authenticate();
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
});