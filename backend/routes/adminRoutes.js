const express = require("express");

const {
  getAllUsers,
  getAllComplaints,
  getAllAgents,
  assignComplaint,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Every route below requires a valid token AND the "Admin" role
router.use(protect, authorize("Admin"));

router.get("/users", getAllUsers);
router.get("/complaints", getAllComplaints);
router.get("/agents", getAllAgents);
router.post("/assign", assignComplaint);

module.exports = router;
