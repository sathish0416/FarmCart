import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api";

// export const registerCustomer = async (data) => {
//   return await axios.post(${API_BASE_URL}/customer/register, data);
// };
export const registerCustomer = async (farmerData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customer/register`, 
      farmerData, 
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering customer", error);
    throw error;
  }
};
// Login Farmer and Store Token
export const loginCustomer = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customer/login`, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // You can save the token in localStorage or state
  } catch (error) {
    console.error("Error logging in customer", error);
    throw error;
  }
};



export const registerFarmer = async (farmerData) => {
  try {
    console.log("auth service",farmerData); 
    const response = await axios.post(
      `${API_BASE_URL}/farmer/register`, 
      farmerData, 
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering farmer", error);
    throw error;
  }
};

// Login Farmer and Store Token
export const loginFarmer = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/farmer/login`,loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // You can save the token in localStorage or state
  } catch (error) {
    console.error("Error logging in farmer", error);
    throw error;
  }
};