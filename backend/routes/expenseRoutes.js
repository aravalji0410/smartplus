const auth = require("../middleware/auth");

router.post("/", auth, expenseCtrl.createExpense);
router.put("/:id", auth, expenseCtrl.updateExpense);
router.delete("/:id", auth, expenseCtrl.deleteExpense);