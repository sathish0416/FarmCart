import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Import the authentication hook
import "./FarmerRegister.css"; // Import external CSS

const FarmerRegister = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [successPopup, setSuccessPopup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  
  
  
  const { login,register } = useAuth(); // Use the register function from the authentication hook
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    // Check password match
    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    const userData = { name, password, phone: mobile, address };

    try {
      setLoading(true); // Show loading overlay
      
      // Call register API
      const success = await register("farmer", userData);

      if (!success || success.message === "User with this phone numnber already exists") {
        throw new Error(success.message);
      } 
      // Auto login after successful registration
      const loginResponse = await login("farmer", { phone:mobile, password });

      if (loginResponse.message === "Invalid credentials" || loginResponse.message === "Invalid email or password") {
        throw new Error(loginResponse.message);
      }

      
    } catch (err) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false); // Hide loading overlay
    }
  };

  return (  
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">🚜 Farmer Registration</h2>
        

        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="register-input"
            required
          />
     
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="register-input"
            required
          />
                  {error && <p className="error-message">❌ {error}</p>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Navigation Links */}
        <p className="register-text">
          Already have an account?{" "}
          <button onClick={() => navigate("/farmer-login")} className="register-link">
            Login here
          </button>
        </p>
        <p className="register-text">
          Are you a Customer?{" "}
          <button onClick={() => navigate("/customer-register")} className="register-link customer-link">
            Register as Customer
          </button>
        </p>
      </div>
    </div>
  );
};

export default FarmerRegister;