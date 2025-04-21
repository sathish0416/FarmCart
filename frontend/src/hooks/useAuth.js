import {useState} from "react";
import { registerCustomer,loginCustomer,registerFarmer,loginFarmer } from "../services/authService";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login function
  const login = async (role, credentials) => {
    setLoading(true);
    setError(null);
    try {
        const response = role === "farmer"
            ? await loginFarmer(credentials)
            : await loginCustomer(credentials);
          console.log(response);

        if (response?.token) {
            localStorage.setItem("userRole", role);
            localStorage.setItem("token", response.token);

            if (role === "farmer" && response?.farmer) {
                localStorage.setItem("farmerData", JSON.stringify(response.farmer));
                setUser(response.farmer);
            } else if (role === "customer" && response?.customer) {
                localStorage.setItem("customerData", JSON.stringify(response.customer));
                setUser(response.customer);
            } else {
                throw new Error("Invalid response from server");
            }
        }

        return response;
    } catch (err) {
        console.error("Login error:", err);
        setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
        setLoading(false);
    }
};

  // Register function
  const register = async (role, userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = role === "farmer" 
        ? await registerFarmer(userData) 
        : await registerCustomer(userData);

      setUser(response); // Assuming the response contains the user data
      console.log(response)
      return response;
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login, register };
};

export default useAuth;