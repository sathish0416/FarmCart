import React, { useEffect, useState } from "react";


import { useNavigate } from "react-router-dom";
import "./CustomerProfile.css"; // Import the CSS file for styling
import "./../../components/CustomerNavbar"
import CustomerNavbar from "./../../components/CustomerNavbar";

const CustomerProfile = () => {
  const navigate = useNavigate();
const [customerData, setcustomerData] = useState(); // State to store the fetched farmer data

  useEffect(() => {
    // Fetch farmer data from localStorage
    const storedData = JSON.parse(localStorage.getItem("customerData"));

    if (storedData) {
      setcustomerData(storedData); // Set the data to state if found in localStorage
    } else {
      // Use dummy data if no stored data is found
      setcustomerData({
        name: "John Doe",
        mobile: "9876543210",
        address: "123 Green Farm, Village Road, Country",
      });
    }
    },[]);

 

  if (!customerData) {
    return <p>Loading...</p>; // Show loading while the data is being fetched
  }

  return (
    <div className="Profile">
      <CustomerNavbar />

    <div className="profile-container">
      <div className="profile-box">
        <h2 className="profile-title">Customer Profile</h2>
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {customerData.name}
          </p>
          <p>
            <strong>Email:</strong> {customerData.email}
          </p>

          <p>
            <strong>Mobile:</strong> {customerData.phone}
          </p>
          <p>
            <strong>Address:</strong> {customerData.address}
          </p>
        </div>
        <button
          className="edit-profile-button"
          onClick={() => navigate("/customer-edit")}
        >
          Edit Profile
        </button>
      </div>
    </div>
    </div>
  


  );
};

export default CustomerProfile;
