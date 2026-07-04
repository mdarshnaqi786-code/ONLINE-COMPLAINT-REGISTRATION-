const User = require("../models/User");
const Complaint = require("../models/Complaint");
const AssignedComplaint = require("../models/AssignedComplaint");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Complaints
const getAllComplaints = async (req, res) => {
  try {
    // Get all complaints
    const complaints = await Complaint.find().populate(
      "user",
      "name email phone"
    );

    // Get all assignments with agent details
    const assignments = await AssignedComplaint.find().populate(
      "agent",
      "name email"
    );

    // Merge assignment into complaint
    const complaintData = complaints.map((complaint) => {
      const assignment = assignments.find(
        (item) =>
          item.complaint.toString() === complaint._id.toString()
      );

      return {
        ...complaint.toObject(),
        assignedAgent: assignment ? assignment.agent : null,
        assignmentStatus: assignment ? assignment.status : null,
      };
    });

    res.status(200).json({
      success: true,
      count: complaintData.length,
      complaints: complaintData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Agents
const getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({
      role: "Agent",
    }).select("-password");

    res.status(200).json({
      success: true,
      count: agents.length,
      agents,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Assign Complaint
const assignComplaint = async (req, res) => {
  try {
    const { complaintId, agentId } = req.body;

    // Check if complaint is already assigned
    let assignment = await AssignedComplaint.findOne({
      complaint: complaintId,
    });

    if (assignment) {
      // Update existing assignment
      assignment.agent = agentId;
      assignment.assignedBy = req.user.id;
      assignment.status = "Assigned";

      await assignment.save();

      return res.status(200).json({
        success: true,
        message: "Assignment Updated Successfully",
        assignment,
      });
    }

    // Create new assignment
    assignment = await AssignedComplaint.create({
      complaint: complaintId,
      agent: agentId,
      assignedBy: req.user.id,
      status: "Assigned",
    });

    res.status(201).json({
      success: true,
      message: "Complaint Assigned Successfully",
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
  getAllUsers,
  getAllComplaints,
  getAllAgents,
  assignComplaint,
};