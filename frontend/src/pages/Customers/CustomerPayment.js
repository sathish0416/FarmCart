import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerPayment.css"; // Import the CSS file for styling

import CustomerNavbar from "../../components/CustomerNavbar";
const CustomerPayment = () => {
  // State to hold the selected payment method
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing based on selected payment method
    alert(`Payment method selected: ${paymentMethod}`);
    // In a real-world application, here you would handle the payment process.
    // For now, navigate to a dummy success page.
    navigate("/payment-dashboard");
  };

  return (

    <div className="Payment">
      <CustomerNavbar />
    <div className="payment-container">
      <div className="payment-box">
        <h2 className="payment-title">Choose Payment Method</h2>
        <form onSubmit={handlePayment} className="payment-form">
          <div className="payment-option">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
          <div className="payment-option">
            <input
              type="radio"
              id="phonepay"
              name="payment"
              value="PhonePay"
              checked={paymentMethod === "PhonePay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="phonepay">PhonePay</label>
          </div>
          <button type="submit" className="payment-button">
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CustomerPayment;
