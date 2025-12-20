import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
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
        if (token) {
          // Verify token with backend
          const apiBase =
            process.env.REACT_APP_API_URL || "http://localhost:5000";
          const response = await axios.get(`${apiBase}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Merge server response with any existing stored user to preserve name fields when backend returns minimal data
          const existingRaw = localStorage.getItem("user");
          let existing = null;
          try {
            existing = existingRaw ? JSON.parse(existingRaw) : null;
          } catch (e) {
            existing = null;
          }

          const merged = { ...(existing || {}), ...(response.data || {}) };

          setUser(merged);
          localStorage.setItem("user", JSON.stringify(merged));
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, role = null) => {
    try {
      setError(null);
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const requestBody = { email, password };
      if (role) {
        requestBody.role = role;
      }
      const response = await axios.post(
        `${apiBase}/api/auth/login`,
        requestBody
      );
      const { token, user: userData } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setError(null);
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
