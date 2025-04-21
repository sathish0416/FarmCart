import { useCallback, useState } from "react";
import {
  addProduct,
  viewOwnProducts,
  viewOrders,
  updateOrderStatus,
  deleteProduct,
  updateProfile,
  // viewSalesAnalysis,
} from "../services/farmerService";

const useFarmer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add Product
  const handleAddProduct = async (productData) => {

    setLoading(true);
    setError(null);
  
    try {
      const formData = productData;
      console.log("Original item data");
      console.log(productData)
  
      const response = await addProduct(formData);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };
  


  // View Own Products
  const handleViewOwnProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      return await viewOwnProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // View Orders
  const handleViewOrders = useCallback(async () => {
    try {
      const orders = await viewOrders();
      return orders;
    } catch (error) {
      console.error("Error in handleViewOrders:", error);
      return []; // return empty array on error
    }
  },[]);
  
  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, status) => {
    setLoading(true);
    setError(null);
    try {
      return await updateOrderStatus(orderId, status);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order status.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId, token) => {
    setLoading(true);
    setError(null);
    try {
      return await deleteProduct(productId, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  // Update Profile
  const handleUpdateProfile = async (userData) => {
    const token = localStorage.getItem("token");
    console.log(token);
    setLoading(true);
    setError(null);
    try {
      return await updateProfile(userData, token);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.",err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  
//Sales Analysis Handler
// const handleViewSalesAnalysis = async () => {
//   setLoading(true);
//   setError(null);
//   try {
//     return await viewSalesAnalysis();
//   } catch (err) {
//     setError(err.response?.data?.message || "Failed to fetch sales analysis.");
//   } finally {
//     setLoading(false);
//   }
// };



  return {
    loading,
    error,
    handleAddProduct,
    handleViewOwnProducts,
    handleViewOrders,
    handleUpdateOrderStatus,
    handleDeleteProduct,
    handleUpdateProfile,
    // handleViewSalesAnalysis,
  };
};

export default useFarmer;