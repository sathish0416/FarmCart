import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerProfile.css"; // Import the CSS file for styling
import Navbar from "./FarmerNavbar";

const FarmerProfile = () => {
  const navigate = useNavigate();
  const [farmerData, setFarmerData] = useState(null); // State to store the fetched farmer data

  useEffect(() => {
    // Fetch farmer data from localStorage
    const storedData = localStorage.getItem("farmerData");

    if (storedData) {
      try {
        setFarmerData(JSON.parse(storedData)); // Parse and set farmer data
      } catch (error) {
        console.error("Error parsing farmer data from localStorage:", error);
        setFarmerData(null);
      }
    } else {
      // Use dummy data if no stored data is found
      setFarmerData({
        name: "John Doe",
        phone: "9876543210",
        address: "123 Green Farm, Village Road, Country",
      });
    }
  }, []);

  if (!farmerData) {
    return <p className="loading-text">Loading farmer profile...</p>; // Show loading while fetching
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-box">
          <h2 className="profile-title">Farmer Profile</h2>
          <div className="profile-details">
            <p>
              <strong>Name:</strong> {farmerData.name}
            </p>
            <p>
              <strong>Mobile:</strong> {farmerData.phone}
            </p>
            <p>
              <strong>Address:</strong> {farmerData.address}
            </p>
          </div>
          <button
            className="edit-profile-button"
            onClick={() => navigate("/farmer-edit")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default FarmerProfile;