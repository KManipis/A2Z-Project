import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import History from "./History"; 
import Notification from "./Notification";
import ASLGuide from "./ASLGuide";   
import SettingsPage from "./SettingsPage";   
import { NotificationProvider } from "./NotificationContext"; 
import { TranslationsProvider } from "./TranslationsContext";  

function App() {
  return (
    <NotificationProvider>
      <TranslationsProvider>   
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/asl-guide" element={<ASLGuide />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Router>
      </TranslationsProvider>
    </NotificationProvider>
  );
}

export default App;
