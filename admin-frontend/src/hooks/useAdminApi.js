import { useState } from "react";
import {
  registerAdmin,
  loginAdmin,
  getAllFarmers,
  getAllProducts,
  getAllCustomers,
  changeStatusFarmer,
  changeStatusProduct,
  changeStatusOrder,
  getAllOrders
} from "../services/adminServices";

const useAdminActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Admin Registration
  const register = async (adminData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerAdmin(adminData);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Admin registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Admin Login
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginAdmin(credentials);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all farmers
  const fetchFarmers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllFarmers();
      console.log(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch farmers.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProducts();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all customers
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCustomers();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch customers.");
    } finally {
      setLoading(false);
    }
  };
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllOrders();
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  // Update farmer verification status
  const updateFarmerStatus = async (farmerId, verificationStatus) => {
    setLoading(true);
    setError(null);
    try {
      const response = await changeStatusFarmer(farmerId, verificationStatus);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update farmer status.");
    } finally {
      setLoading(false);
    }
  };

  // Update product verification status
  const updateProductStatus = async (productId, status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await changeStatusProduct(productId, status);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product status.");
    } finally {
      setLoading(false);
    }
  };
  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    setError(null);
    try {

      const response = await changeStatusOrder(orderId, status);
      setLoading(false);
      console.log(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product status.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    register,
    login,
    fetchFarmers,
    fetchProducts,
    fetchCustomers,
    updateFarmerStatus,
    updateProductStatus,
    updateOrderStatus,
    fetchOrders
  };
};

export default useAdminActions;
