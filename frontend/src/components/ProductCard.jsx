import React from "react";
import "./ProductCard.css";
import { Edit, Eye } from "lucide-react";

const ProductCard = ({ image, name, category, marketRate, sellingPrice, quantity, seller }) => {
  return (
    <div className="product-card">
      {/* Image */}
      <div className="image-container">
        <img src={image || "/placeholder.svg"} alt={name} className="product-image" />
      </div>

      {/* Product Info */}
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-category">{category || "Uncategorized"}</p>

        <div className="price-info">
          <span>Market Rate:</span> <strong>₹{marketRate?.toFixed(2) || "N/A"}</strong>
        </div>
        <div className="price-info selling-price">
          <span>Selling Price:</span> <strong>₹{sellingPrice?.toFixed(2) || "N/A"}</strong>
        </div>
        <div className="quantity-info">
          <span>Quantity:</span> <strong>{quantity || 0}</strong>
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button className="edit-button">
            <Edit size={14} /> Edit
          </button>
          <button className="view-button">
            <Eye size={14} /> View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
