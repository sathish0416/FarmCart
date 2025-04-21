const express = require("express");
const router = express.Router();
const {createNotification,getNotifications,markAsRead,deleteNotification,getUnreadCount} = require("../controllers/notificationController");
const {authMiddleware}=require("../middlewares/authMiddleware");

// ➤ CREATE a notification
router.post("/create", createNotification);

// ➤ GET notifications for a user
router.get("/:userId",getNotifications);

// ➤ MARK notification as read
router.put("/markAsRead/:notificationId", markAsRead);

// ➤ DELETE a notification
router.delete("/delete/:notificationId", deleteNotification);

// ➤ GET unread notification count
router.get("/unreadCount/:userId", getUnreadCount);

module.exports = router;
