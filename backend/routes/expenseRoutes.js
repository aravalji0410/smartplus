const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const expenseCtrl = require("../controllers/expenseController");

router.post("/", auth, expenseCtrl.createExpense);
router.put("/:id", auth, expenseCtrl.updateExpense);
router.delete("/:id", auth, expenseCtrl.deleteExpense);

module.exports = router;