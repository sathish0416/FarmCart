import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerSubscriptions.css";
import CustomerNavbar from "../../components/CustomerNavbar";

const CustomerSubscriptions = () => {
  const navigate = useNavigate();

  const [subscribedFarmers, setSubscribedFarmers] = useState([
    {
      id: 1,
      farmerName: "John Doe",
      farmName: "Green Valley Farm",
      location: "California, USA",
      phone: "123-456-7890",
      products: ["Tomatoes", "Carrots", "Lettuce"],
    },
    {
      id: 2,
      farmerName: "Emma Smith",
      farmName: "Sunny Acres",
      location: "Texas, USA",
      phone: "987-654-3210",
      products: ["Strawberries", "Blueberries", "Apples"],
    },
  ]);

  const [unsubscribedFarmers, setUnsubscribedFarmers] = useState([
    {
      id: 3,
      farmerName: "Liam Johnson",
      farmName: "Harvest Farms",
      location: "Florida, USA",
      phone: "456-789-1230",
      products: ["Peppers", "Eggplants", "Cucumbers"],
    },
    {
      id: 4,
      farmerName: "Olivia Brown",
      farmName: "Fresh Meadows",
      location: "Oregon, USA",
      phone: "789-456-0123",
      products: ["Lettuce", "Spinach", "Kale"],
    },
  ]);

  const [showSubscribed, setShowSubscribed] = useState(true);

  // Handle Subscribe
  const handleSubscribe = (farmer) => {
    setSubscribedFarmers([...subscribedFarmers, farmer]);
    setUnsubscribedFarmers(unsubscribedFarmers.filter((f) => f.id !== farmer.id));
  };

  // Handle Unsubscribe
  const handleUnsubscribe = (farmer) => {
    setUnsubscribedFarmers([...unsubscribedFarmers, farmer]);
    setSubscribedFarmers(subscribedFarmers.filter((f) => f.id !== farmer.id));
  };

  return (
    <div className="subscriptions">
      <CustomerNavbar />
      <div className="subscriptions-container">
        <h2 className="subscriptions-title">
          {showSubscribed ? "Your Subscriptions" : "Available Farmers"}
        </h2>

        <button
          className="toggle-button"
          onClick={() => setShowSubscribed(!showSubscribed)}
        >
          {showSubscribed ? "View Unsubscribed Farmers" : "View Subscribed Farmers"}
        </button>

        {showSubscribed ? (
          <div className="subscribed-farmers">
            {subscribedFarmers.length > 0 ? (
              <ul className="farmers-list">
                {subscribedFarmers.map((farmer) => (
                  <li key={farmer.id} className="farmer-item">
                    <p><strong>{farmer.farmerName}</strong> ({farmer.farmName})</p>
                    <p>Location: {farmer.location}</p>
                    <p>Phone: {farmer.phone}</p>
                    <p>Products: {farmer.products.join(", ")}</p>
                    <div className="action-buttons">
                      <button className="unsubscribe-btn" onClick={() => handleUnsubscribe(farmer)}>
                        Unsubscribe
                      </button>
                      <button
                        className="message-btn"
                        onClick={() => navigate("/customer-message", { state: { farmer } })}
                      >
                        Message
                      </button>
                      <button className="view-btn">View</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No subscribed farmers.</p>
            )}
          </div>
        ) : (
          <div className="unsubscribed-farmers">
            {unsubscribedFarmers.length > 0 ? (
              <ul className="farmers-list">
                {unsubscribedFarmers.map((farmer) => (
                  <li key={farmer.id} className="farmer-item">
                    <p><strong>{farmer.farmerName}</strong> ({farmer.farmName})</p>
                    <p>Location: {farmer.location}</p>
                    <p>Phone: {farmer.phone}</p>
                    <p>Products: {farmer.products.join(", ")}</p>
                    <button className="subscribe-btn" onClick={() => handleSubscribe(farmer)}>
                      Subscribe
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No unsubscribed farmers.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSubscriptions;
