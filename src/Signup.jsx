import "./Signup.css";
import Background from "./assets/Background.jpg";
import A2Zlogo from "./assets/A2Zlogo.jpeg";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!email.endsWith("@gmail.com")) newErrors.email = "Only @gmail.com emails allowed";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    else if (password.length > 100) newErrors.password = "Use 100 characters or fewer for your password";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Signup successful!");
      
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="signup-back">
      <div className="signup-box">
        <div className="signup-left-panel">
          <img src={A2Zlogo} alt="Logo" className="signup-logo-left" />
          <h2 className="signup-welcome">Welcome to SignA2Z: Live ASL Translation & Learning</h2>
          <p className="signup-info">
            Bridging the gap between the Deaf and hearing through real-time ASL translation.
          </p>
        </div>

        <div className="signup-right-panel">
          <img src={A2Zlogo} alt="Logo" className="signup-logo-top" />
          <h2 className="signup-title">Register</h2>
          <p className="signup-text">Fill in your details to create an account.</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <button type="button" className="signup-google">
              <FcGoogle size={20} style={{ marginRight: "8px" }} />
              Sign up with Google
            </button>

            <div className="signup-divider">━━━━━━━ or ━━━━━━━</div>

            <label className="signup-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`signup-input ${errors.email ? "error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <label className="signup-label">Password</label>
            <div className="signup-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`signup-input ${errors.password ? "error" : ""}`}
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="signup-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}

            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p className="signup-login-text">
            <a href="/login" className="signup-login-link">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
