import React, { useState } from "react";
import { FaTrash, FaBell } from "react-icons/fa";
import "./Notification.css";
import NotifBell from "./assets/NotifBell.png";
import UserPic from "./assets/UserPic.jpg";
import { useNotifications } from "./NotificationContext"; 

function Notification() {
  const { notifications, markAsRead, deleteNotif, markAllRead, unreadCount } =
    useNotifications();

  const [selectedNotif, setSelectedNotif] = useState(null);

  const handleCardClick = (notif) => {
    setSelectedNotif(notif);
    markAsRead(notif.id); 
  };

  const handleClosePopup = () => {
    setSelectedNotif(null);
  };

  return (
    <div className="notification-page">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>NOTIFICATIONS</h1>
        </div>
        <div className="header-right">
          <div className="notification-bell">
            <FaBell size={20} className="bell-icon" />
            {unreadCount > 0 && <span className="bell-dot"></span>}
          </div>
          <div className="user-info">
            <img src={UserPic} alt="User" />
            <span>User Name</span>
          </div>
        </div>
      </div>

      <div className="notification-container">
        {notifications.length > 0 && (
          <div className="mark-all-container">
            <span className="mark-all-text" onClick={markAllRead}>
              Mark all as read
            </span>
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="empty-state">
            <img src={NotifBell} alt="Notification Bell" />
            <p>Zzz... You’re all caught up</p>
          </div>
        ) : (
          <div className="notification-list">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`notification-card ${n.unread ? "unread" : "read"}`}
                onClick={() => handleCardClick(n)}
              >
                {n.unread && <span className="dot"></span>}
                <span className="text">{n.text}</span>
                <span className="time">{n.time}</span>
                <FaTrash
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotif(n.id); 
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {selectedNotif && (
          <div className="popup-overlay">
            <div className="popup-card">
              <h3>{selectedNotif.text}</h3>
              <p>{selectedNotif.time}</p>
              <button className="close-btn" onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;
