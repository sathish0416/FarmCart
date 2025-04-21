import React, { useState } from "react";
import Navbar from "./FarmerNavbar"; // Import Navbar
import "./AddNewItem.css"; // Import your custom CSS
import useFarmer from "../../hooks/useFarmer";

const AddNewItem = () => {
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    marketRate: "",
    price: "",
    quantity: "",
    expiryDate:"",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const { handleAddProduct } = useFarmer();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem({ ...newItem, image: file });

      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = async () => {
    const { name, category, marketRate, price, quantity, image } = newItem;
  
    if (!name || !category || !marketRate || !price || !quantity || !image) {
      alert("❌ Please fill all fields and upload an image!");
      return;
    }
  
    try {
      console.log(newItem);
      await handleAddProduct(newItem);
      alert("✅ Product submitted successfully!");
  
      // Reset form
      // setNewItem({ name: "", category: "", marketPrice: "", price: "", quantity: "", expiryDate:"",image: null });
      // setPreviewImage(null);
    } catch (error) {
      alert("❌ Error submitting product: " + error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-item-container">
        <h2>🆕 Add New Item</h2>

        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="input-field"
        />

        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="input-field"
        >
          <option value="">Select Category</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Grains">Grains</option>
        </select>

        <input
          type="text"
          placeholder="Market Price (₹/kg)"
          value={newItem.marketRate}
          onChange={(e) => setNewItem({ ...newItem, marketRate: e.target.value })}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Your Price (₹/kg)"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="input-field"
        />

        <input
          type="number"
          placeholder="Quantity (kg)"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="input-field"
        />
        <input
          type="date"
          placeholder="Expiry Date"
          value={newItem.expiryDate}
          onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
          className="input-field"
        />
        {/* Image Upload Field */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="input-field"
        />

        {/* Preview Uploaded Image */}
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}

        <button onClick={handleAddItem} className="submit-button">
          ✅ Submit for Approval
        </button>
      </div>
    </>
  );
};

export default AddNewItem;
