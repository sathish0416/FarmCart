import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./CustomerRegister.css"; // External CSS

const CustomerRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  
  const navigate = useNavigate();
  const { register, login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    // Check password match
    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    const userData = { name, email, password, phone: mobile, address };

    try {
      setLoading(true); // Show loading overlay
      
      // Call register API
      const success = await register("customer", userData);

      if (!success || success.message === "Email already exist") {
        throw new Error(success.message);
      } 
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
    <div className="register-container">
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Success Popup */}
      {successPopup && (
        <div className="success-popup">
          ✅ Customer Registered Successfully! Redirecting...
        </div>
      )}

      <div className="register-box">+-
        <h2 className="register-title">🚜 Customer Registration</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="register-input" required />
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="register-input" required />
          <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="register-input" required />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="register-input" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="register-input" required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="register-input" required />

          {/* Error Message */}
          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {/* Navigation Links */}
        <p className="register-text">
          Already have an account?{" "}
          <button onClick={() => navigate("/customer-login")} className="register-link">
            Login here
          </button>
        </p>
        <p className="register-text">
          Are you a Farmer?{" "}
          <button onClick={() => navigate("/farmer-register")} className="register-link customer-link">
            Register as Farmer
          </button>
        </p>
      </div>
    </div>
  );
};

export default CustomerRegister;
