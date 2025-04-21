import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFarmer from "../../hooks/useFarmer"; // Adjust the import path if needed
import "./FarmerEdit.css"; // Import CSS for styling
import Navbar from "./FarmerNavbar";

const FarmerEdit = () => {
  const navigate = useNavigate();
  const { handleUpdateProfile, loading, error } = useFarmer();

  // Local state for farmer data and form fields
  const [farmerData, setFarmerData] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  // On component mount, load farmer data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("farmerData"));
    if (storedData) {
      setFarmerData(storedData);
      setName(storedData.name || "");
      // Assuming storedData.phone contains the mobile number
      setMobile(storedData.phone || "");
      setAddress(storedData.address || "");
    } else {
      // If no data is found, use dummy defaults
      const dummyData = { name: "Not fetched", phone: "Not fetched", address: "Not fetched" };
      setFarmerData(dummyData);
      setName(dummyData.name);
      setMobile(dummyData.phone);
      setAddress(dummyData.address);
    }
  }, []);

  // Handle form submission to update profile
  const handleSave = async (e) => {
    e.preventDefault();
    const updatedData = { name, phone: mobile, address };
    try {
      await handleUpdateProfile(updatedData);
      alert("Profile updated successfully!");
      // Optionally, update localStorage with the new data
      const newFarmerData = { ...farmerData, name, phone: mobile, address };
      setFarmerData(newFarmerData);
      localStorage.setItem("farmerData", JSON.stringify(newFarmerData));
      // Navigate back to the dashboard after update
      navigate("/farmer-Dashboard");
    } catch (err) {
      alert("Failed to update profile!");
      console.log(err);
    }
  };

  if (!farmerData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="edit-container">
        <div className="edit-box">
          <h2 className="edit-title">Edit Profile</h2>
          <form onSubmit={handleSave} className="edit-form">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="edit-input"
              required
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="edit-input"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="edit-input"
              required
            />
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default FarmerEdit;