import { useCallback, useState } from "react";
import {
  getApprovedProducts,
  updateProfile,
  placeOrder,
  getCustomerOrders,
  addToWishlist,
  getWishlist,
  getCart,
  removeFromCart,
  removeFromWishlist,
  addToCart,
} from "../services/customerService";

const useCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Approved Products
  const handleGetApprovedProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      return await getApprovedProducts(token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  },[]);

  // Update Profile
  const handleUpdateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      return await updateProfile(userData, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Place Order
  const handlePlaceOrder = async (customerId, products) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      return await placeOrder(products, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };
  

  // Get Customer Orders
  const handleGetCustomerOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      return await getCustomerOrders(token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  },[]);

  const handleAddToWishList = async (productId)=>{
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      return await addToWishlist(productId, token);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }

  };

  const handleGetWishlist =useCallback(async(req,res)=>{
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      return await getWishlist(token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  },[]);
  const handleGetCart =useCallback( async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      return await getCart(token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch cart.");
    } finally {
      setLoading(false);
    }
  },[]);
  
  const handleAddToCart = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      return await addToCart(productId, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add to cart.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveFromCart = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      return await removeFromCart(productId, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove from cart.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveFromWishlist = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      console.log("USe customer",productId);
      const token = localStorage.getItem("token");
      return await removeFromWishlist(productId, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove from wishlist.");
    } finally {
      setLoading(false);
    }
  };
  

  return {
    loading,
    error,
    handleGetApprovedProducts,
    handleUpdateProfile,
    handlePlaceOrder,
    handleGetCustomerOrders,
    handleAddToWishList,
    handleGetWishlist,
    handleRemoveFromCart,
    handleAddToCart,
    handleGetCart,
    handleRemoveFromWishlist
  };
};

export default useCustomer;
