import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Importing Home styles
import "./Button.css"; // Importing button styles

const Home = () => {
  const navigate = useNavigate();
  const handleRoleSelection = (role) => {
    localStorage.setItem("userRole", role); // Store role in local storage
    navigate(`/${role}-login`); // Navigate to login page based on role
  };

  return (
    <div className="landing-container">
      <div className="content">
        <h1 className="title">Welcome to FarmCart</h1>
        <p className="subtitle">Connecting Farmers and Consumers Directly</p>

        <div className="buttons-container">
          <button onClick={() => handleRoleSelection("farmer")} className="btn btn-farmer">
            Farmer
          </button>
          <button onClick={() => handleRoleSelection("customer")} className="btn btn-consumer">
            Consumer
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;
