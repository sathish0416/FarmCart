import React, { useState, useEffect, useRef } from "react";
import Navbar from "./FarmerNavbar"; 
import { Link} from "react-router-dom"; 
import useFarmer from "../../hooks/useFarmer"; 
import "./FarmerDashboard.css"; 
import { Edit, Trash2 } from "lucide-react";
// import FarmerAnalysis   from "./FarmerAnalysis.js";


const FarmerDashboard = () => {
  const [items, setItems] = useState([]);
  const { handleViewOwnProducts } = useFarmer();
  const hasFetched = useRef(false); 

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchProducts = async () => {
      try {
        const products = await handleViewOwnProducts();
        setItems(products.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [handleViewOwnProducts]);


  return (
    <>
      <Navbar />
      <div className="dashboard">
      <div className="dashboard-container">
        {/* <div className="dashboard-analysis">
        {/* // <h3>📊 View Sales Analysis</h3> */}
            {/* //  <FarmerAnalysis/> */} 
        {/* </div> */}
        <h2 className="dashboard-title">📋 Your Items</h2>

        <div className="items-list">
          {/* Add New Item Card */}
          <div className="item-card add-item-card">
            <Link to="/add-item" className="add-item-link">
              <h3>➕ Add New Item</h3>
            </Link>
          </div>

          {/* Render Items */}
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item._id} className="item-card">
                <Link to={`/item/${item._id}`} className="item-link">
                  {/* Product Image */}
                  <img
                    src={
                      item.image?.data
                        ? `data:${item.image.contentType};base64,${btoa(
                            new Uint8Array(item.image.data.data).reduce(
                              (data, byte) => data + String.fromCharCode(byte),
                              ""
                            )
                          )}`
                        : "../../assets/default.jpg"
                    }
                    alt={item.name}
                  />

                  {/* Product Details */}
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-category">{item.category || "Uncategorized"}</p>
                  
                  <div className="item-quantity">
                    <span>Status:</span> <strong>{item.status } </strong>
                  </div>

                  <div className="item-price">
                    <span>Market Rate:</span> <strong>₹{item.marketRate?.toFixed(2) || "N/A"}</strong>
                  </div>
                  <div className="item-price selling-price">
                    <span>Selling Price:</span> <strong>₹{item.price?.toFixed(2) || "N/A"}</strong>
                  </div>
                  <div className="item-quantity">
                    <span>Quantity:</span> <strong>{item.quantity || 0} kg</strong>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="item-actions">
                  <button className="edit-button">
                    <Edit size={14} /> Edit
                  </button>
                  <button className="delete-button">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items">Loading</p>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default FarmerDashboard;
