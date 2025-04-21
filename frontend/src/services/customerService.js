import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api/customer";

export const getApprovedProducts = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Customer service",response);
    return response.data;
  } catch (error) {
    console.error("Error fetching approved products:", error.response?.data?.message || error.message);
    throw error;
  }
};




export const updateProfile = async (userData, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/profile`, // Adjust the API URL
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

export const placeOrder = async (products,token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/order`,
      { products },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const getCustomerOrders = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching customer orders:", error.response?.data?.message || error.message);
    throw error;
  }
};

// ✅ Add a product to the wishlist
export const addToWishlist = async (productId,token) => {

  try {
    console.log(productId,token);
    const response = await axios.post(
     ` ${API_BASE_URL}/wishlist`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token for authentication
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    console.log("Added to wishlist successfully",response);

    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error.response?.data?.message || error.message);
    throw error;
  }
};

// ✅ Get wishlist of a customer
export const getWishlist = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ Include token
    });
    console.log("From service");
    console.log(response)
    return response; // Return wishlist array
  } catch (error) {
    console.error("Error fetching wishlist:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const removeFromWishlist = async (productId, token) => {
  try {
    console.log("Services",productId);
    const response = await axios.delete(
      `${API_BASE_URL}/wishlist/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.message);
    return response.data.wishList; // Returns updated wishlist
  } catch (error) {
    console.error("Error removing from wishlist:", error.response?.data?.message || error.message);
  }
};

export const addToCart = async (productId, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/cart`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.message);
    return response.data.cart; // Returns updated cart
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data?.message || error.message);
  }
};

export const removeFromCart = async (productId, token) => {
  try {
    const response = await axios.delete(
     `${API_BASE_URL}/cart/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.message);
    return response.data.cart; // Returns updated cart
  } catch (error) {
    console.error("Error removing from cart:", error.response?.data?.message || error.message);
  }
};

export const getCart = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    console.log("Cart:", response.data.cart);
    return response.data.cart;
  } catch (error) {
    console.error("Error fetching cart:", error.response?.data?.message || error.message);
  }
};