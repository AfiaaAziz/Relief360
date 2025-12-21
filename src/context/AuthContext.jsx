import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Helper function to validate user data integrity
const validateUserData = (userData) => {
  if (!userData || typeof userData !== "object") return false;

  // Check for essential user fields
  const hasRequiredFields =
    (userData.id || userData.user_id) &&
    (userData.email || userData.email_address) &&
    userData.role;

  // Check for suspicious data patterns (like mixing different user data)
  const email = userData.email || userData.email_address;
  if (email && typeof email === "string" && email.length > 100) return false;

  return hasRequiredFields;
};

// Helper function to sanitize user data
const sanitizeUserData = (userData) => {
  if (!userData) return null;

  return {
    id: userData.id || userData.user_id || userData.UserID,
    email: userData.email || userData.email_address || userData.Email,
    role: userData.role || userData.user_type || userData.userRole,
    firstName:
      userData.firstName ||
      userData.first_name ||
      userData.FirstName ||
      userData.firstname,
    lastName:
      userData.lastName ||
      userData.last_name ||
      userData.LastName ||
      userData.lastname,
    name: userData.name || userData.fullName || userData.full_name,
    ...userData, // Include all other fields
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;

      const parsed = JSON.parse(raw);

      // Validate user data before setting
      if (validateUserData(parsed)) {
        return sanitizeUserData(parsed);
      } else {
        console.warn("Invalid user data found in localStorage, clearing...");
        localStorage.removeItem("user");
        return null;
      }
    } catch (e) {
      console.error("Error parsing user data:", e);
      localStorage.removeItem("user");
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.log("No auth token found");
          setLoading(false);
          return;
        }

        // Verify token with backend
        const apiBase =
          process.env.REACT_APP_API_URL || "http://localhost:5000";

        try {
          const response = await axios.get(`${apiBase}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Validate and sanitize the server response
          const serverUserData = response.data;

          if (validateUserData(serverUserData)) {
            const cleanUserData = sanitizeUserData(serverUserData);
            console.log(
              "✅ Auth verification successful:",
              cleanUserData.email,
              cleanUserData.role
            );
            setUser(cleanUserData);
            localStorage.setItem("user", JSON.stringify(cleanUserData));
          } else {
            console.warn("⚠️ Invalid user data from server, using stored data");
            // Keep existing user if server returns invalid data
            if (!user) {
              // If no valid stored user either, clear everything
              console.log("🗑️ No valid user data, clearing auth state");
              localStorage.removeItem("authToken");
              localStorage.removeItem("user");
              setUser(null);
            }
          }
        } catch (apiError) {
          console.error("API call failed:", apiError.message);

          // If API fails but we have stored user data, keep it
          if (user && validateUserData(user)) {
            console.log("📱 Using cached user data due to API failure");
          } else {
            // No valid user data and API failed, clear everything
            console.log(
              "🗑️ Clearing auth data due to API failure and no valid cache"
            );
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        // Clear all auth data on failure
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, role = null) => {
    try {
      setError(null);

      // Clear any existing user data to prevent contamination
      console.log("🔄 Starting login process for:", email, "Role:", role);
      localStorage.removeItem("user");

      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const requestBody = { email, password };
      if (role) {
        requestBody.role = role;
      }

      console.log("📤 Sending login request...");
      const response = await axios.post(
        `${apiBase}/api/auth/login`,
        requestBody
      );

      const { token, user: userData } = response.data;

      // Validate the returned user data
      if (!validateUserData(userData)) {
        console.error("❌ Invalid user data received from server:", userData);
        throw new Error("Invalid user data received from server");
      }

      // Sanitize and set clean user data
      const cleanUserData = sanitizeUserData(userData);
      console.log(
        "✅ Login successful for:",
        cleanUserData.email,
        "Role:",
        cleanUserData.role
      );

      // Store auth data
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(cleanUserData));
      setUser(cleanUserData);

      return cleanUserData;
    } catch (err) {
      console.error("❌ Login failed:", err.message);

      // Clear any partial auth data on failure
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setUser(null);

      const message = err.response?.data?.message || "Login failed";
      setError(message);
      throw err;
    }
  };

  const logout = () => {
    // Clear all authentication data completely
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Clear any cached data that might cause contamination
    sessionStorage.clear(); // Clear session storage as well

    // Reset state
    setUser(null);
    setError(null);
    setLoading(false);

    // Force page reload to ensure complete clean slate (optional but recommended)
    window.location.href = "/";
  };

  const signup = async (userData) => {
    try {
      setError(null);
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.post(`${apiBase}/api/auth/signup`, userData);
      const { token, user: newUser } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      return newUser;
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      setError(message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    signup,
    setUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
