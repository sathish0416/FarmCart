const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true,},

  userRole: {
    type: String,
    enum: ["Customer", "Farmer", "Admin"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "userRole", // 👈 Dynamic reference based on userRole
  },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

// Define the Notification model
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
