import { useCallback, useState } from "react";
import {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
  getUnreadCount,
} from "../services/notificationService";

const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchNotifications = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotifications(userId);
      setNotifications(data);
      return data;
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  },[]);

  const fetchUnreadCount = async () => {
    try {
      const count = await getUnreadCount(userId);
      setUnreadCount(count);
    } catch (err) {
      console.error("Error fetching unread count:", err);
      setError(err.response?.data?.message || "Failed to load unread count");
    }
  };

  const addNotification = async (userRole, title, message) => {
    try {
      await createNotification(userId, userRole, title, message);
      fetchNotifications();
      fetchUnreadCount();
    } catch (err) {
      console.error("Error creating notification:", err);
      setError(err.response?.data?.message || "Failed to create notification");
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId);
      fetchNotifications();
      fetchUnreadCount();
    } catch (err) {
      console.error("Error marking notification as read:", err);
      setError(err.response?.data?.message || "Failed to mark as read");
    }
  };

  const removeNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      fetchNotifications();
    } catch (err) {
      console.error("Error deleting notification:", err);
      setError(err.response?.data?.message || "Failed to delete notification");
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    fetchUnreadCount,
    addNotification,
    markNotificationAsRead,
    removeNotification,
  };
};

export default useNotifications;
