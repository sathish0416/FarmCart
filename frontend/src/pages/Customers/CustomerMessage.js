import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomerNavbar from "../../components/CustomerNavbar";
import "./CustomerMessage.css";

const CustomerMessage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const farmer = location.state?.farmer;

  const [message, setMessage] = useState("");

  if (!farmer) {
    return <p>No farmer selected.</p>;
  }

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    alert(`Message sent to ${farmer.farmerName}: ${message}`);
    setMessage("");
  };

  return (
    <div className="message-page">
      <CustomerNavbar />
      <div className="message-container">
        <h2>Chat with {farmer.farmerName}</h2>
        <p>Farm: {farmer.farmName}</p>
        <p>Location: {farmer.location}</p>
        
        <div className="chat-box">
          <textarea
            className="message-input"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className="send-btn" onClick={handleSendMessage}>
            Send
          </button>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default CustomerMessage;
