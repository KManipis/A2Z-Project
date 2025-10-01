import { useState } from "react";
import "./ASLGuide.css";
import userpic from "./assets/UserPic.jpg";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "./NotificationContext";
import { useTranslations } from "./TranslationsContext";

import A from "./assets/letters-imgs/A.jpg"; 
import B from "./assets/letters-imgs/B.jpg"; 
import C from "./assets/letters-imgs/C.jpg"; 
import D from "./assets/letters-imgs/D.jpg"; 
import E from "./assets/letters-imgs/E.jpg"; 
import F from "./assets/letters-imgs/F.jpg"; 
import G from "./assets/letters-imgs/G.jpg"; 
import H from "./assets/letters-imgs/H.jpg"; 
import I from "./assets/letters-imgs/I.jpg"; 
import J from "./assets/letters-imgs/J.jpg"; 
import K from "./assets/letters-imgs/K.jpg"; 
import L from "./assets/letters-imgs/L.jpg"; 
import M from "./assets/letters-imgs/M.jpg"; 
import N from "./assets/letters-imgs/N.jpg"; 
import O from "./assets/letters-imgs/O.jpg"; 
import P from "./assets/letters-imgs/P.jpg"; 
import Q from "./assets/letters-imgs/Q.jpg"; 
import R from "./assets/letters-imgs/R.jpg"; 
import S from "./assets/letters-imgs/S.jpg"; 
import T from "./assets/letters-imgs/T.jpg"; 
import U from "./assets/letters-imgs/U.jpg"; 
import V from "./assets/letters-imgs/V.jpg"; 
import W from "./assets/letters-imgs/W.jpg"; 
import X from "./assets/letters-imgs/X.jpg"; 
import Y from "./assets/letters-imgs/Y.jpg"; 
import Z from "./assets/letters-imgs/Z.jpg"; 

import aVid from "./assets/letters-vids/A-practice.mp4";
import bVid from "./assets/letters-vids/B-practice.mp4";
import cVid from "./assets/letters-vids/C-practice.mp4";
import dVid from "./assets/letters-vids/D-practice.mp4";
import eVid from "./assets/letters-vids/E-practice.mp4";
import fVid from "./assets/letters-vids/F-practice.mp4";
import gVid from "./assets/letters-vids/G-practice.mp4";
import hVid from "./assets/letters-vids/H-practice.mp4";
import iVid from "./assets/letters-vids/I-practice.mp4";
import jVid from "./assets/letters-vids/J-practice.mp4";
import kVid from "./assets/letters-vids/K-practice.mp4";
import lVid from "./assets/letters-vids/L-practice.mp4";
import mVid from "./assets/letters-vids/M-practice.mp4";
import nVid from "./assets/letters-vids/N-practice.mp4";
import oVid from "./assets/letters-vids/O-practice.mp4";
import pVid from "./assets/letters-vids/P-practice.mp4";
import qVid from "./assets/letters-vids/Q-practice.mp4";
import rVid from "./assets/letters-vids/R-practice.mp4";
import sVid from "./assets/letters-vids/S-practice.mp4";
import tVid from "./assets/letters-vids/T-practice.mp4";
import uVid from "./assets/letters-vids/U-practice.mp4";
import vVid from "./assets/letters-vids/V-practice.mp4";
import wVid from "./assets/letters-vids/W-practice.mp4";
import xVid from "./assets/letters-vids/X-practice.mp4";
import yVid from "./assets/letters-vids/Y-practice.mp4";
import zVid from "./assets/letters-vids/Z-practice.mp4";

const aslImages = { A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z };
const aslVideos = { A:aVid,B:bVid,C:cVid,D:dVid,E:eVid,F:fVid,G:gVid,H:hVid,I:iVid,J:jVid,K:kVid,L:lVid,M:mVid,N:nVid,O:oVid,P:pVid,Q:qVid,R:rVid,S:sVid,T:tVid,U:uVid,V:vVid,W:wVid,X:xVid,Y:yVid,Z:zVid };

const ASLGuide = ({ setActivePage }) => {
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);
  const { unreadCount } = useNotifications();
  const { translations } = useTranslations();

  // Filter letters by search
  const filteredData = search
    ? [...new Set(search.toUpperCase().split(""))]
        .map((char) => (aslImages[char] ? char : null))
        .filter(Boolean)
    : Object.keys(aslImages);

  return (
    <div className="asl-guide">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>ASL GUIDE</h1>
        </div>
        <div className="header-right">
          <div className="notification-bell" onClick={() => setActivePage("notification")}>
            <FaBell size={20} className="bell-icon" />
            {unreadCount > 0 && <span className="bell-dot"></span>}
          </div>
          <div className="user-info" onClick={() => setActivePage("settings")}>
            <img src={userpic} alt="User" />
            <span>User Name</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrap">
        <input
          type="text"
          placeholder="Type a word (e.g. happy)"
          className="asl-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="asl-grid-wrapper">
        <div className="asl-grid">
          {filteredData.map((letter) => (
            <div key={letter} className="asl-card">
              <img src={aslImages[letter]} alt={letter} />
              <span className="letter">{letter}</span>
              <button onClick={() => setSelectedLetter(letter)}>Practice</button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedLetter && (
        <div className="asl-modal-overlay">
          <div className="asl-modal">
            <h2>Practice: {selectedLetter}</h2>
            <video src={aslVideos[selectedLetter]} controls autoPlay />
            <button onClick={() => setSelectedLetter(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ASLGuide;
