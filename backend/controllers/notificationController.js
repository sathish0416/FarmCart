const Notification = require("../models/Notification");

// ✅ CREATE a new notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, userRole,title, message } = req.body;

    const notification = new Notification({
      userId,
      userRole,
      title,
      message,
    });

    await notification.save();
    res.status(201).json({ success: true, message: "Notification created", notification });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ GET all notifications for a specific user
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ timestamp: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ MARK notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    res.status(200).json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ DELETE a notification
exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ GET unread notification count
exports.getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const count = await Notification.countDocuments({ userId, isRead: false });
    res.status(200).json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
