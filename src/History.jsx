import React, { useState } from "react";
import { FaSearch, FaSlidersH, FaTrash, FaBell } from "react-icons/fa";
import "./History.css";
import UserPic from "./assets/UserPic.jpg";
import { useNotifications } from "./NotificationContext"; 
import { useTranslations } from "./TranslationsContext";   

function History({ setActivePage }) {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [historyFilter, setHistoryFilter] = useState("All");
  const [selectedHistory, setSelectedHistory] = useState(null);

  const { unreadCount } = useNotifications(); 
  const { translations, deleteTranslation, clearTranslations } = useTranslations(); 

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const toggleLetter = (letter) => {
    setSelectedLetters((prev) =>
      prev.includes(letter) ? prev.filter((l) => l !== letter) : [...prev, letter]
    );
  };

  const filteredData = translations.filter((item) => {
    const searchMatch = item.letter.toLowerCase().includes(search.toLowerCase());

    if (historyFilter === "All" && selectedLetters.length === 0) {
      return searchMatch;
    }

    if (selectedLetters.length > 0) {
      return (
        searchMatch &&
        selectedLetters.some((letter) => item.letter.includes(letter))
      );
    }

    return searchMatch;
  });

  return (
    <div className="history-page">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>HISTORY</h1>
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

      <div className="main-content">
        <div className="search-bar-wrapper">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Type A-Z"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSlidersH
              className="filter-icon"
              onClick={() => setFilterOpen(!filterOpen)}
            />
          </div>
          {translations.length > 0 && (
            <button className="clear-btn danger" onClick={clearTranslations}>
              Clear All
            </button>
          )}
        </div>

        {filterOpen && (
          <div className="filter-dropdown">
            <h4>TYPE LETTER</h4>
            <div className="letter-grid">
              {alphabet.map((letter) => (
                <div
                  key={letter}
                  className={`letter-button ${
                    selectedLetters.includes(letter) ? "active" : ""
                  }`}
                  onClick={() => toggleLetter(letter)}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div
              className={`all-button ${historyFilter === "All" ? "active" : ""}`}
              onClick={() => {
                setHistoryFilter("All");
                setSelectedLetters([]);
                setFilterOpen(false);
              }}
            >
              All
            </div>
          </div>
        )}

        <div className="history-list">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className={`history-card ${
                  selectedHistory?.id === item.id ? "active" : ""
                }`}
                onClick={() => setSelectedHistory(item)}
              >
                <span className="letter">“{item.letter}”</span>
                <span className="date">{item.date}</span>

                <FaTrash
                  className="delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTranslation(item.id); 
                  }}
                />
              </div>
            ))
          ) : (
            <p className="no-history-text">No history found...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
