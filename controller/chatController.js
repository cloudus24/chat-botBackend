const Message = require("../model/message.model");

const getMessages = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    // Find messages for the specific userId
    const messages = await Message.find({ userId: userId });

    // Check if messages were found
    if (!messages) {
      return res.status(404).json({ status: false, message: "No messages found" });
    }

    // Return messages with a status
    res.json({ status: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error); // Log error for debugging
    res.status(500).json({ status: false, error: error.message });
  }
};

const sendMessage = async (req, res) => {
  const { sender, text, userId } = req.body;
  try {
    const newMessage = new Message({ sender, text, userId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};