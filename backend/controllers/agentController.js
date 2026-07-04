const AssignedComplaint = require("../models/AssignedComplaint");
const Complaint = require("../models/Complaint");

// Get Assigned Complaints
const getAssignedComplaints = async (req, res) => {
  try {
    const complaints = await AssignedComplaint.find({
      agent: req.user.id,
    })
      .populate("complaint")
      .populate("assignedBy", "name email")
      .populate("agent", "name email");

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Complaint Status

const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const assignment = await AssignedComplaint.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assigned Complaint Not Found",
      });
    }

    if (assignment.agent.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "This complaint is not assigned to you",
      });
    }

    // Update AssignedComplaint
    assignment.status = status;
    await assignment.save();

    console.log("Complaint ID:", assignment.complaint);

    // Find complaint first
    const complaint = await Complaint.findById(assignment.complaint);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint document not found",
      });
    }

    complaint.status = status;
    await complaint.save();

    console.log("Complaint Updated:", complaint.status);

    res.status(200).json({
      success: true,
      message: "Status Updated Successfully",
      assignment,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getAssignedComplaints,
  updateComplaintStatus,
};