import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Importing custom authentication hook
import "./CustomerLogin.css"; // Import CSS

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [error, setError] = useState(""); // Corrected error state

  const navigate = useNavigate();
  const { login } = useAuth(); // Using custom hook for authentication


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true); // Show loading overlay
      
      // Call register API

      // Auto login after successful registration
      const loginResponse = await login("customer", { email, password });

      if (loginResponse.message === "Invalid credentials" || loginResponse.message === "Invalid email or password") {
        throw new Error(loginResponse.message);
      }

      localStorage.setItem("token", loginResponse.token);
      
      // Show success popup
      setSuccessPopup(true);
      setTimeout(() => {
        setSuccessPopup(false);
        navigate("/customer-dashboard");
      }, 2000);
      
    } catch (err) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false); // Hide loading overlay
    }

  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">🚜 Customer Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          {error && <p className="error-text">{error}</p>} {/* Show error message */}
          <button type="submit" className="login-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-text">
          New user?{" "}
          <button onClick={() => navigate("/customer-register")} className="register-link">
            Register here
          </button>
        </p>
        <p className="login-text">
          Are you a Farmer?{" "}
          <button
            onClick={() => navigate("/farmer-login")}
            className="login-link customer-link"
          >
            Login as Farmer
          </button>
        </p>
      </div>

      {/* Success Popup */}
      {successPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            ✅ Login Successful! Redirecting...
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerLogin;
