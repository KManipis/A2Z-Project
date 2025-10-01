import { useState } from "react";
import { useNotifications } from "./NotificationContext"; 
import "./SettingsPage.css";
import userPic from "./assets/UserPic.jpg";
import { FaBell } from "react-icons/fa"; 

export default function SettingsPage({ setActivePage }) {
  const [profileImage, setProfileImage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "Email.address@gmail.com",
    password: "",
    dob: "",
    language: "English",
    country: "Philippines",
  });

  const { unreadCount } = useNotifications(); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => setProfileImage(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    console.log("Profile saved:", formData);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="header-left">
          <h1>SETTINGS</h1>
        </div>
        <div className="header-right">
          <div
            className="notification-bell"
            onClick={() => setActivePage("notification")}
          >
            <FaBell size={20} className="bell-icon" />
            {unreadCount > 0 && <span className="bell-dot"></span>}
          </div>

          {/* User Info */}
          <div className="user-info">
            <img src={userPic} alt="User" />
            <span>User Name</span>
          </div>
        </div>
      </div>

      {/* ✅ Main Settings Card */}
      <div className="settings-card">
        <h2>Edit Profile</h2>
        <p className="subtitle">
          Manage personal information and account details
        </p>

        <div className="profile-section">
          <img
            src={profileImage || userPic}
            alt="Profile"
            className="profile-img"
          />
          <div className="profile-buttons">
            <label className="btn secondary">
              Upload New
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </label>
            <button className="btn secondary" onClick={handleRemoveImage}>
              Remove
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} disabled />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
              <option>English</option>
              <option>Tagalog</option>
              <option>Spanish</option>
            </select>
          </div>

          <div className="form-group">
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option>Philippines</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>
        </form>

        <div className="buttons">
          <button type="button" className="btn cancel">
            Cancel
          </button>
          <button
            type="submit"
            className="btn primary"
            onClick={handleSave}
          >
            Save Profile
          </button>
        </div>
      </div>

      {showToast && <div className="toast">✅ Profile Saved!</div>}
    </div>
  );
}
