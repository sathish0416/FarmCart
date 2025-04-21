import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { FaBellConcierge } from "react-icons/fa6";
import logo from "../assets/logo.jpg"; // Correct import for logo
import "./CustomerNavbar.css"; // Import the CSS file

const CustomerNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false); // Track if scrolling down
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown after navigation
  };

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
        // Scrolling down
        setScrollingDown(true);
      } else {
        // Scrolling up
        setScrollingDown(false);
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrollingDown ? "hidden" : ""}`}>
      <div className="container">
        {/* Logo and Website Name */}
        <div className="logo" onClick={() => navigate("/customer-dashboard")}>
          <img src={logo} className="logo-img" alt="logo" />
          <span className="FarmCart">FarmCart</span>
        </div>

        {/* Account Dropdown, Wishlist, and Cart */}
        <div className="account">
          {/* My Account Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="dropdown-btn">
              <FaUser className="icon" /> My Account
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => handleNavigation("/customer-profile")}>
                  Profile
                </li>
                <li onClick={() => handleNavigation("/customer-orders")}>
                  Orders
                </li>
                <li onClick={() => handleNavigation("/customer-subscriptions")}>
                  Subscriptions
                </li>
                <li className="divider"></li>
                <li
                  onClick={() => handleNavigation("/customer-login")}
                  className="logout"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>

          {/* Wishlist and Cart Icons */}
          <div className="icons">
            <button onClick={() => handleNavigation("/customer-wishlist")}>
              <FaHeart className="icon" />
            </button>
            <button onClick={() => handleNavigation("/customer-cart")}>
              <FaShoppingCart className="icon" />
            </button>
            <button onClick={() => handleNavigation("/customer-notification")}>
              <FaBellConcierge className="icon" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
