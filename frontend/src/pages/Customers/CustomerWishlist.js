import React, { useState, useEffect,useRef } from "react";
import "./CustomerWishlist.css"; // Import the CSS file
import useCustomer from "../../hooks/useCustomer";

import CustomerNavbar from "../../components/CustomerNavbar";

const CustomerWishlist = () => {
  const { handleGetWishlist, handleRemoveFromWishlist,handleAddToCart} = useCustomer(); // Include remove function
  const [wishlist, setWishlist] = useState([]);
    const hasFetched = useRef(false); 
  

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchWishlist = async () => {
      const response = await handleGetWishlist();
      console.log("gdfhfjgb",response);
      setWishlist(response.data.wishList);
 
    };

    fetchWishlist();
  }, [handleGetWishlist]);

  const handleAddCart = async (productId) => {
    try{
      await handleAddToCart(productId);
      alert("Added to cart successfully");
    }catch(e){
      alert(e);

    }
  };

  const handleRemoveItem = async (itemId) => {
    await handleRemoveFromWishlist(itemId); // Call API to remove item
    setWishlist(wishlist.filter(item => item._id !== itemId)); // Update UI
  };

  return (


    <div className="Wishlist">
      <CustomerNavbar />
      <div className="wishlist-container">
        <h2 className="wishlist-title">Your Wishlist</h2>
        {wishlist.length > 0 ? (
          <ul className="wishlist-list">
            {wishlist.map((item) => (
              <li key={item._id} className="wishlist-item">
                <img src={
                      item.image?.data
                        ? `data:${item.image.contentType};base64,${btoa(
                            new Uint8Array(item.image.data.data).reduce(
                              (data, byte) => data + String.fromCharCode(byte),
                              ""
                            )
                          )}`
                        : "../../assets/default.jpg"
                    } alt={item.foodName} className="wishlist-image" />
                <div className="wishlist-details">
                  <h3><strong>{item.name}</strong></h3>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p className="wishlist-price"><strong>Price:</strong> {item.price}</p>
                  <p><strong>Farmer:</strong> {item.farmer.name}</p>
                  <p><strong>Contact:</strong> {item.farmer.phone}</p>
                  <p><strong>Address:</strong> {item.farmer.address}</p>
                  <div className="wishlist-buttons">
                    <button 
                      className="wishlist-add-to-cart" 
                      onClick={() => handleAddCart(item._id)}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="wishlist-remove" 
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-items">No items in your wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerWishlist;
