const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {
    const { name, message, complaintId } = req.body;

    const newMessage = await Message.create({
      name,
      message,
      complaintId,
    });

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      complaintId: req.params.complaintId,
    });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};