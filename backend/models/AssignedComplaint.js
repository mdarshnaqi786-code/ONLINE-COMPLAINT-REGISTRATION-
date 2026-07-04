const mongoose = require("mongoose");

const assignedComplaintSchema = new mongoose.Schema(
  {
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Assigned", "Accepted", "Rejected", "Completed"],
      default: "Assigned",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "AssignedComplaint",
  assignedComplaintSchema
);