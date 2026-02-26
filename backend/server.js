const express = require("express");
const sequelize = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/groups", require("./routes/groupRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));

// health route
app.get("/", (req, res) => {
  res.send("Smart+ API running");
});

const PORT = process.env.PORT || 5000;

// IMPORTANT: start server EVEN if DB fails
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// DB connect separately
sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB error:", err));