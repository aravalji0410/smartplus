const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/groups", require("./routes/groupRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Smart+ API running");
});

// Port (Render compatible)
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();