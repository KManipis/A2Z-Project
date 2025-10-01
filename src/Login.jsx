import "./Login.css";
import { auth, provider } from "./Firebase";
import { signInWithPopup } from "firebase/auth";
import A2Zlogo from "./assets/A2Zlogo.jpeg";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!email.endsWith("@gmail.com"))
      newErrors.email = "Email must end with @gmail.com";

    if (!password) newErrors.password = "Password is required";
    else if (password.length > 100)
      newErrors.password = "Use 100 characters or fewer for your password";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
     
      navigate("/dashboard");        
    }
  };

  return (
    <div className="back-page">
      <div className="login-container">
        <div className="login-left">
          <img src={A2Zlogo} alt="A2Z Logo" className="login-logo" />
          <h2 className="login-heading">
            Welcome to SignA2Z: Live ASL Translation & Learning
          </h2>
          <p className="login-subtext">
            Bridging the gap between the Deaf and hearing through real-time ASL translation.
          </p>
        </div>

        <div className="login-right">
          <img src={A2Zlogo} alt="A2Z Logo" className="login-logo-2" />
          <h2 className="login-title">Login</h2>
          <p className="login-description">Please login to continue.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`login-input ${errors.email ? "error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <label className="login-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`login-input ${errors.password ? "error" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={100}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}

           
            <button type="submit" className="login-btn">Sign In</button>

            <div className="login-divider">━━━━━━━ or ━━━━━━━</div>

              {/* GOOGLE LOGIN BUTTON */}
<button
  type="button"
  className="login-google-btn"
  onClick={async () => {
    try {
      // Open Google sign-in popup
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info
      const user = result.user;

      // You can now use user.displayName, user.email, etc.
      console.log("Google user:", user);
      alert(`Welcome ${user.displayName}!`);

      // TODO: Redirect to dashboard or store user info in state
      // Example: navigate("/dashboard");
    } catch (error) {
      // Handle errors here
      console.error("Google login error:", error);

      // Common errors:
      // - popup blocked
      // - unauthorized domain
      // - network issues
      alert("Google login failed. Check console for details.");
    }
  }}
>
  <FcGoogle size={20} style={{ marginRight: "8px" }} />
  Sign in with Google
</button>
          </form>

          <a href="#" className="login-forgot-link">Forgot password?</a>
          <p className="login-signup-text">
            <a href="/signup" className="login-signup-link">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
