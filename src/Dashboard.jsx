import React, { useState } from "react";
import {
  FaHome,
  FaHistory,
  FaBookOpen,
  FaMoon,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaCamera,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import "./Dashboard.css";
import A2Zlogo from "./assets/A2Zlogo.jpeg";
import UserPic from "./assets/UserPic.jpg";
import History from "./History";
import Notification from "./Notification";
import Camera from "./Camera"; 
import ASLGuide from "./ASLGuide";   
import SettingsPage from "./SettingsPage";   
import { useNotifications } from "./NotificationContext"; 
import { useTranslations } from "./TranslationsContext";  

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const navigate = useNavigate(); 
  const { unreadCount } = useNotifications(); 
  const { translations } = useTranslations(); 

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      <aside className="sidebar">
        <div>
          <div className="sidebar-logo">
            <img src={A2Zlogo} alt="A2Z Logo"/>
          </div>

          <div className="divider"></div>

          <div className="sidebar-menu">
            <div
              className={`sidebar-menu-item ${
                activePage === "dashboard" ? "active" : ""
              }`}
              onClick={() => setActivePage("dashboard")}
            >
              <FaHome /> Dashboard
            </div>
            <div
              className={`sidebar-menu-item ${
                activePage === "history" ? "active" : ""
              }`}
              onClick={() => setActivePage("history")}
            >
              <FaHistory /> History
            </div>
            <div
              className={`sidebar-menu-item ${
                activePage === "aslguide" ? "active" : ""
              }`}
              onClick={() => setActivePage("aslguide")}
            >
              <FaBookOpen /> ASL Guide
            </div>
          </div>

          <div className="divider"></div>

          <div className="sidebar-menu">
            <div
              className="sidebar-menu-item"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FaMoon /> {darkMode ? "Light Mode" : "Dark Mode"}
            </div>

            <div
              className={`sidebar-menu-item ${
                activePage === "settings" ? "active" : ""
              }`}
              onClick={() => setActivePage("settings")}
            >
              <FaCog /> Settings
            </div>

            <div
              className={`sidebar-menu-item ${
                activePage === "logout" ? "active" : ""
              }`}
              onClick={() => {
                setActivePage("logout");
                navigate("/login"); 
              }}
            >
              <FaSignOutAlt /> Log out
            </div>
          </div>

          <div className="divider"></div>
        </div>

        <div className="sidebar-footer">
          <a href="#">Privacy Policy</a> | <a href="#">Terms &amp; Conditions</a>
          <p>©2025 SIGNA2Z. All rights reserved.</p>
        </div>
      </aside>

      <main className="main-content">
        {activePage === "dashboard" && (
          <>
            <div className="dashboard-header">
              <div className="header-left">
                <h1>DASHBOARD</h1>
              </div>
              <div className="header-right">
                <div
                  className={`notification-bell ${
                    activePage === "notification" ? "active" : ""
                  }`}
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

            <div className="camera-section">
              <div className="camera-box">
                <FaCamera className="camera-icon" />
              </div>
              <div className="camera-tips">
                <h3>BEFORE YOU START</h3>
                <p>
                  Make sure your hand is visible <br />
                  Hold still for better recognition
                </p>
                
                <button
                  className="start-btn"
                  onClick={() => setActivePage("camera")}
                >
                  START
                </button>
              </div>
            </div>

            <div className="recent-section">
              <div className="recent-header">
                <h2>Recent Translations</h2>
                <span
                  className="view-all-link"
                  onClick={() => setActivePage("history")}
                >
                  View all
                </span>
              </div>

              <div className="recent-list">
                {translations.length === 0 ? (
                  <p>No recent translations...</p>
                ) : (
                  translations.map((item) => (
                    <div key={item.id} className="recent-card">
                      {item.img && <img src={item.img} alt="Recent Translation" />}
                      <div className="recent-card-info">
                        <h3>[{item.letter}]</h3>
                        <p>{item.date}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {activePage === "history" && <History setActivePage={setActivePage} />}
        {activePage === "notification" && <Notification />}
        {activePage === "camera" && <Camera setActivePage={setActivePage} />}
        {activePage === "aslguide" && <ASLGuide setActivePage={setActivePage} />}
        {activePage === "settings" && <SettingsPage setActivePage={setActivePage} />}
      </main>
    </div>
  );
}

export default Dashboard;
