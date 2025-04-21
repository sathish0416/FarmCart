import React from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerNavbar.css"; // Import external CSS
import { FaUserCircle, FaShoppingCart, FaBell, FaSignOutAlt } from "react-icons/fa"; // Icons
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear all local storage data
    localStorage.clear();
    console.log("User logged out successfully. All local storage data cleared.");
    navigate("/");
  };
  return (
    <nav className="navbar">
      {/* Logo and FarmCart Text */}
      <div className="navbar-left" onClick={() => navigate("/farmer-dashboard")}>
        <img src={logo} alt="FarmCart Logo" className="logo"/>
        <span className="brand-name">FarmCart</span>
      </div>

      {/* Profile, Orders, and Notifications */}
      <div className="navbar-right">
        <button className="nav-item" onClick={() => navigate("/farmer-orders")}>
          <FaShoppingCart size={24} />
          <span>Orders</span>
        </button>
        <button className="nav-item" onClick={() => navigate("/farmer-notification")}>
          <FaBell size={24} />
          <span>Notifications</span>
        </button>
        <button className="nav-item" onClick={() => navigate("/farmer-profile")}>
          <FaUserCircle size={24} />
          <span>Profile</span>
        </button>
        {/* Logout Button */}
        <button className="nav-item logout-button" onClick={handleLogout}>
          <FaSignOutAlt size={24} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
