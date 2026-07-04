const express = require("express");

const { createComplaint,
        getMyComplaints,
        getComplaintById,
        updateComplaint,
        deleteComplaint,
      } = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createComplaint);
router.get("/", protect, getMyComplaints);
router.get("/:id", protect, getComplaintById);
router.put("/:id", protect, updateComplaint);
router.delete("/:id", protect,deleteComplaint);

module.exports = router;