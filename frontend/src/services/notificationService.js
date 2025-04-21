import axios from "axios";

const BASE_URL = "http://localhost:5000/api/notification";

// ✅ CREATE a new notification
export const createNotification = async (userId, userRole, title, message) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, {
      userId,
      userRole,
      title,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating notification:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ GET all notifications for a specific user
export const getNotifications = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data.notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ MARK a notification as read
export const markAsRead = async (notificationId) => {
  try {
    await axios.put(`${BASE_URL}/markAsRead/${notificationId}`);
    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ DELETE a notification
export const deleteNotification = async (notificationId) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${notificationId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting notification:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ GET unread notification count
export const getUnreadCount = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/unreadCount/${userId}`);
    return response.data.count;
  } catch (error) {
    console.error("Error fetching unread count:", error.response?.data || error.message);
    throw error;
  }
};


