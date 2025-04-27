const express = require("express");
const { deleteUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const router = express.Router();

router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
