const Complaint = require("../models/Complaint");
const AssignedComplaint = require("../models/AssignedComplaint");


// ================================
// Create Complaint
// ================================
const createComplaint = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      state,
      pincode,
      comment,
    } = req.body;

    const complaint = await Complaint.create({
      user: req.user.id,
      name,
      address,
      city,
      state,
      pincode,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Complaint Submitted Successfully",
      complaint,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================================
// Get Logged In User Complaints
// ================================
const getMyComplaints = async (req, res) => {
  try {

    // get complaints created by user
    const complaints = await Complaint.find({
      user: req.user.id,
    });


    // get assigned complaint details
    const assignments =
      await AssignedComplaint.find()
        .populate(
          "agent",
          "name email phone"
        );


    // merge complaint + assignment
    const complaintData = complaints.map(
      (complaint) => {

        const assignment =
          assignments.find(
            (item) =>
              item.complaint.toString() ===
              complaint._id.toString()
          );


        return {
          ...complaint.toObject(),

          // latest agent status
          status: assignment
            ? assignment.status
            : complaint.status,


          // assigned agent details
          assignedAgent: assignment
            ? assignment.agent
            : null,
        };

      }
    );


    res.status(200).json({
      success: true,
      count: complaintData.length,
      complaints: complaintData,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ================================
// Get Single Complaint
// ================================
const getComplaintById = async (req, res) => {

  try {

    const complaint =
      await Complaint.findById(
        req.params.id
      );


    if (!complaint) {

      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });

    }

    // Only the complaint owner (or staff) may view it
    if (
      req.user.role === "User" &&
      complaint.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this complaint",
      });
    }


    res.status(200).json({
      success: true,
      complaint,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// ================================
// Update Complaint
// ================================
const updateComplaint = async (req, res) => {

  try {

    const complaint =
      await Complaint.findById(
        req.params.id
      );


    if (!complaint) {

      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });

    }

    // Only the complaint owner may edit it
    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this complaint",
      });
    }

    // Once a complaint has moved past "Pending" (assigned/being handled)
    // the user should no longer be able to edit its details
    if (complaint.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message:
          "This complaint is already being processed and can no longer be edited",
      });
    }

    // Prevent the user from overwriting protected fields
    const { name, address, city, state, pincode, comment } = req.body;

    const updatedComplaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        { name, address, city, state, pincode, comment },
        {
          new: true,
          runValidators: true,
        }
      );


    res.status(200).json({
      success: true,
      message:
        "Complaint updated successfully",
      complaint: updatedComplaint,
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// ================================
// Delete Complaint
// ================================
const deleteComplaint = async (req, res) => {

  try {

    const complaint =
      await Complaint.findById(
        req.params.id
      );


    if (!complaint) {

      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });

    }

    // Only the complaint owner may delete it
    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this complaint",
      });
    }

    // Once a complaint has moved past "Pending" it is already being
    // handled by an agent, so it should no longer be deletable
    if (complaint.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message:
          "This complaint is already being processed and can no longer be deleted",
      });
    }


    await Complaint.findByIdAndDelete(
      req.params.id
    );


    res.status(200).json({
      success: true,
      message:
        "Complaint deleted successfully",
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// ================================
// Export Controllers
// ================================
module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
};