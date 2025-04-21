import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/admin";

// Function to register an admin
export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, adminData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("✅ Admin registered successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error registering admin:", error.response?.data || error.message);
    throw error;
  }
};

// Function to log in an admin
export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    localStorage.setItem("token", response.data.token);
    console.log("✅ Admin logged in successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error logging in admin:", error.response?.data || error.message);
    throw error;
  }
};

// Function to update farmer verification status
export const changeStatusFarmer = async (farmerId, verificationStatus) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/farmer`,
      { id: farmerId, verificationStatus },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("✅ Farmer status updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating farmer status:", error.response?.data || error.message);
    throw error;
  }
};

// Function to update product verification status
export const changeStatusProduct = async (productId, status) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/product`,
      { id: productId, status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("✅ Product status updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating product status:", error.response?.data || error.message);
    throw error;
  }
};
export const changeStatusOrder = async (orderId, status) => {
  try {

    const response = await axios.put(
      `${API_BASE_URL}/order`,
      { orderId: orderId, status },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("✅ Order status updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating order status:", error.response?.data || error.message);
    throw error;
  }
};

// Function to get all farmers
export const getAllFarmers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/farmers`);
    console.log("✅ Farmers fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching farmers:", error.response?.data || error.message);
    throw error;
  }
};

// Function to get all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    console.log("✅ Products fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching products:", error.response?.data || error.message);
    throw error;
  }
};

// Function to get all customers
export const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers`);
    console.log("✅ Customers fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching customers:", error.response?.data || error.message);
    throw error;
  }
};
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order`);
    console.log("✅ Orders fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching orders:", error.response?.data || error.message);
    throw error;
  }
};
