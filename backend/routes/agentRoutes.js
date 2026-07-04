const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getAssignedComplaints,
  updateComplaintStatus,
} = require("../controllers/agentController");

// Every route below requires a valid token AND the "Agent" role
router.use(protect, authorize("Agent"));

router.get("/complaints", getAssignedComplaints);
router.put("/complaints/:id/status", updateComplaintStatus);

module.exports = router;
