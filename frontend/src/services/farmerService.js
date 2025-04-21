
import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api/farmer";

export const addProduct = async (productData) => {
  try {
    // Retrieve the auth token from localStorage
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      throw new Error("No authentication token found. Please log in.");
    }

    // ✅ Ensure productData is properly formatted as FormData
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("marketRate", productData.marketRate);
    formData.append("price", productData.price);
    formData.append("quantity", productData.quantity);

    formData.append("expiryDate",productData.expiryDate);
    
    if (productData.image) {
      formData.append("image", productData.image);
    } else {

      console.warn("⚠️ Warning: No image selected.");
    }

    // ✅ Debugging: Check if all fields are included
    console.log("🚀 FormData being sent:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // Send POST request with FormData
    const response = await axios.post(`${API_BASE_URL}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("✅ Product added successfully:", response.data);
    return response.data;

  } catch (error) {
    console.error("❌ Error adding product:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const viewOwnProducts = async () => {
  try {
    const authToken = localStorage.getItem("token");

    if (!authToken) throw new Error("No authentication token found.");

    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    console.log("✅ Products fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching products:", error.response?.data || error.message);
    throw error;
  }
};


export const viewOrders = async () => {
  try {
    const authToken = localStorage.getItem("token");

    if (!authToken) throw new Error("No authentication token found.");

    const response = await axios.get(`${API_BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    console.log("✅ Orders fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching orders:", error.response?.data || error.message);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) throw new Error("No authentication token found.");

    const response = await axios.put(
      `${API_BASE_URL}/orders`,
      { orderId, status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("✅ Order status updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating order status:", error.response?.data || error.message);
    throw error;
  }
};


export const deleteProduct = async (productId, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    alert("Product deleted successfully!");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to delete product.");
  }
};



export const updateProfile = async (userData, token) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/api/farmer/profile", // Adjust the API URL
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send the token
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    alert("Profile updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to update profile.");
  }
};


// export const viewSalesAnalysis = async () => {
//   try {
//     const authToken = localStorage.getItem("token");
//     if (!authToken) throw new Error("No authentication token found.");

//     const response = await axios.get(`${API_BASE_URL}/sales-analysis`, {
//       headers: { Authorization: `Bearer ${authToken}` },
//     });

//     console.log("✅ Sales analysis fetched:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error fetching sales analysis:", error.response?.data || error.message);
//     throw error;
//   }
// };