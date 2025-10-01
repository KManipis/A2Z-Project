import React, { useState } from "react";
import { FaCamera, FaBell } from "react-icons/fa";
import "./Camera.css";
import UserPic from "./assets/UserPic.jpg";
import { useNotifications } from "./NotificationContext";

function Camera({ setActivePage }) {
  const [recognizedLetter, setRecognizedLetter] = useState("A - B");

  const { unreadCount } = useNotifications();

  return (
    <div className="camera-page">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>CAMERA</h1>
        </div>
        <div className="header-right">
          <div
            className="notification-bell"
            onClick={() => setActivePage("notification")}
          >
            <FaBell size={20} className="bell-icon" />
            {unreadCount > 0 && <span className="bell-dot"></span>}
          </div>

          <div
            className="user-info"
            onClick={() => setActivePage("settings")}
            
          >
            <img src={UserPic} alt="User" />
            <span>User Name</span>
          </div>
        </div>
      </div>

      <div className="camera-container">
        <div className="camera-frame">
          <FaCamera size={80} className="camera-big-icon" />
        </div>

        <div className="recognized-text">
          Recognized Letter: <span>{recognizedLetter}</span>
        </div>

        <div className="camera-controls">
          <button className="control-btn start-btn">▶ Start</button>
          <button className="control-btn stop-btn">⏹ Stop</button>
        </div>

        <div className="camera-hint">
          💡 <em>Hint: Hold and steady inside the frame</em>
        </div>
      </div>
    </div>
  );
}

export default Camera;
