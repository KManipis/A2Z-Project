import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Update", time: "4:00 PM", unread: true },
    { id: 2, text: "Reminder", time: "5:46 PM", unread: true },
    { id: 3, text: "System maintenance", time: "Yesterday", unread: true },
    { id: 4, text: "System maintenance", time: "Today", unread: true },
    { id: 5, text: "New Features!", time: "Aug 23", unread: false },

  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllRead,
        deleteNotif,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
