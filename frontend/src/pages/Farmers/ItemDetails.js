import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./FarmerNavbar"; // Import Navbar
import "./ItemDetails.css"; // Import custom CSS

const ItemDetails = () => {
  const { id } = useParams(); // Extract the item id from URL params
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    // Logic to fetch item details using the `id`
    // For demonstration, using static data:
    const item = {
      id: id,
      name: "Tomatoes",
      price: "₹50/kg",
      stock: 100,
      approvalStatus: "Pending",
    };
    setItemDetails(item);
  }, [id]);

  if (!itemDetails) {
    return <div>Loading...</div>;
  }

  const handleOutOfStock = () => {
    console.log("Marking item as Out of Stock");
  };

  const handleDeleteItem = () => {
    console.log("Deleting item...");
  };

  const handlePriceChange = () => {
    console.log("Changing price...");
  };

  const handleSendForApproval = () => {
    console.log("Sending item for approval...");
  };

  return (
    <>
      <Navbar />
      <div className="item-details-container">
        <h2>{itemDetails.name}</h2>
        <p>Price: {itemDetails.price}</p>
        <p>Stock: {itemDetails.stock} units</p>
        <p>Approval Status: {itemDetails.approvalStatus}</p>

        <div className="item-options">
          <button onClick={handleOutOfStock}>Out of Stock</button>
          <button onClick={handleDeleteItem}>Delete</button>
          <button onClick={handlePriceChange}>Change Price</button>
          <button onClick={handleSendForApproval}>Send for Approval</button>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
