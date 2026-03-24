const router = require("express").Router();
const controller = require("../controllers/settlementController");
const auth = require("../middleware/authMiddleware");

router.get("/:groupId", auth, controller.getSettlements);

module.exports = router;