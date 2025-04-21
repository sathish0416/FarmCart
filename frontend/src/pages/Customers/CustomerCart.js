import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerCart.css";

import CustomerNavbar from "../../components/CustomerNavbar";
import useCustomer from "../../hooks/useCustomer";

const CustomerCart = () => {
  const navigate = useNavigate();
  const { handleGetCart,handleRemoveFromCart } = useCustomer();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [errors, setErrors] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  

  useEffect(() => {
    const fetchCart = async () => {
      const response = await handleGetCart();
      if (response) {
        setCartItems(response);
        const initialSelection = response.reduce((acc, item) => {
          acc[item.id] = true;
          return acc;
        }, {});
        setSelectedItems(initialSelection);
      }
    };
    fetchCart();
  }, [handleGetCart]);

  const removeItem= async (productId,itemName)=>{
    try{
      await handleRemoveFromCart(productId);
      alert("Removed ",itemName);
    }catch(err){
      alert(err);
    }
  }

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity > item.stock ? item.stock : newQuantity,
            }
          : item
      )
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: newQuantity > cartItems.find((item) => item.id === id)?.stock ? "Exceeds available stock" : "",
    }));
  };
  // const increaseQuantity = (id) => {
  //   const item = cartItems.find((item) => item.id === id);
  //   if (item.quantity < item.stock) {
  //     updateQuantity(id, item.quantity + 1);
  //   }
  // };
  // const decreaseQuantity = (id) => {
  //   const item = cartItems.find((item) => item.id === id);
  //   if (item.quantity > 1) {
  //     updateQuantity(id, item.quantity - 1);
  //   }
  // };

  const handleQuantityChange = (id, value) => {
    const newQuantity = Number(value);
    if (isNaN(newQuantity) || newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const toggleSelection = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectedTotalPrice = cartItems.reduce(
    (total, item) => (selectedItems[item.id] ? total + item.price * item.quantity : total),
    0
  );

  const { handlePlaceOrder } = useCustomer(); // Import handlePlaceOrder

const placeOrder = async (e) => {
  e.preventDefault();
  
  const selectedCartItems = cartItems.filter((item) => selectedItems[item.id]);
  
  if (selectedCartItems.length === 0) {
    alert("Please select at least one item to proceed with payment.");
    return;
  }

  const customerId = localStorage.getItem("customerId"); // Assuming customer ID is stored in localStorage
  const orderItems = selectedCartItems;

  try {
    const response = await handlePlaceOrder(customerId, orderItems);
    if (response) {
      alert("Order placed successfully! Order ID:");
      navigate("/customer-dashboard");
    } else {
      alert("Failed to place order. Please try again.");
    }
  } catch (error) {
    alert("Error placing order: " + error.message);
  }
};


  return (
    <div className="Cart">
      <CustomerNavbar />
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <input
                    type="checkbox"
                    checked={selectedItems[item.id]}
                    onChange={() => toggleSelection(item.id)}
                  />
                  <img src={
                      item.image?.data
                        ? `data:${item.image.contentType};base64,${btoa(
                            new Uint8Array(item.image.data.data).reduce(
                              (data, byte) => data + String.fromCharCode(byte),
                              ""
                            )
                          )}`
                        : "../../assets/default.jpg"
                    } alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Price: ₹{item.price} per {item.unit}</p>
                    <p>Available Stock: {item.stock}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="quantity-input"
                        min="1"
                        max={item.stock}
                      />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</button>
                    </div>
                    <button className="remove-item" onClick={() => {removeItem(item._id,item.name)}}>
                  Remove
                </button>

                    {errors[item.id] && <p className="error">{errors[item.id]}</p>}
                    <p>Subtotal: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Total: ₹{selectedTotalPrice}</h3>
            </div>
            <form onSubmit={placeOrder} className="payment-form">
              <h3>Select Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash on Delivery
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="PhonePay"
                    checked={paymentMethod === "PhonePay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  PhonePay
                </label>
              </div>
              <button type="submit" className="payment-button" >
                Place Order
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerCart;