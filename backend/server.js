const express = require("express");
const sequelize = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json());

// Routes (wrap in try/catch for safety)
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// DB connect asynchronously (won't crash server if DB fails)
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();