import React, { useEffect} from "react";
import Navbar from "./FarmerNavbar";
import useNotifications from "../../hooks/useNotification";
import "./FarmerNotifications.css";
import { formatRelativeDate } from "../../utils/dateUtils"; // Import timestamp formatter
const FarmerNotifications = () => {
  const farmerData = JSON.parse(localStorage.getItem("farmerData"));
  const userId = farmerData?.id;

  const {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markNotificationAsRead,
  } = useNotifications(userId);

  useEffect(() => {
    if (userId) {
      fetchNotifications(userId);
    }
  }, [fetchNotifications,userId]);

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);
  };

  return (
    <>
      <Navbar />
      <div className="notifications-container">
        <h2>🔔 Notifications {unreadCount > 0 && <span className="badge">{unreadCount}</span>}</h2>

        {loading ? (
          <p>Loading notifications...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : notifications.length > 0 ? (
          <ul className="notification-list">
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`notification-item ${notification.isRead ? "read" : "unread"}`}
                onClick={() => handleMarkAsRead(notification._id)}
              >
                <div className="notification-header">
                  <span className="title">{notification.title}</span>
                  <span className="timestamp">{formatRelativeDate(notification.timestamp)}</span>
                </div>
                <p className="message">{notification.message}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No new notifications.</p>
        )}
      </div>
    </>
  );
};

export default FarmerNotifications;
