import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Importing custom authentication hook
import "./FarmerLogin.css"; // Import CSS

const FarmerLogin = () => {
  const [phone, setPhone] = useState(""); // State for phone number
  const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
  const { login } = useAuth(); // Using custom hook for authentication
  const navigate = useNavigate();
    const [error, setError] = useState(""); // Corrected error state
      // const [successPopup, setSuccessPopup] = useState(false);
    
  

      const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
          setLoading(true); // Show loading overlay
          
          // Call register API
    
          // Auto login after successful registration
          const loginResponse = await login("farmer", { phone, password });
    
          if (loginResponse.message === "Invalid credentials" || loginResponse.message === "Farmer not found") {
            throw new Error(loginResponse.message);
          }
    
          localStorage.setItem("token", loginResponse.token);
          
          // Show success popup
          // setSuccessPopup(true);
          setTimeout(() => {
            // setSuccessPopup(false);
            navigate("/farmer-dashboard");
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
        <h2 className="login-title">🚜 Farmer Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="tel" // Change type to 'tel' for phone numbers
            placeholder="Enter Phone Number"
            value={phone} // Bind to phone state
            onChange={(e) => setPhone(e.target.value)} // Update phone state
            className="login-input"
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
          <button onClick={() => navigate("/farmer-register")} className="register-link">
            Register here
          </button>
        </p>
        <p className="login-text">
          Are you a Customer?{" "}
          <button
            onClick={() => navigate("/customer-login")}
            className="login-link customer-link"
          >
            Login as Customer
          </button>
        </p>
      </div>
    </div>
  );
};

export default FarmerLogin;
