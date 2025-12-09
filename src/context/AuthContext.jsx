import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
          setUser(response.data);
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

  const login = async (email, password) => {
    try {
      setError(null);
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.post(`${apiBase}/api/auth/login`, {
        email,
        password,
      });
      const { token, user: userData } = response.data;
      localStorage.setItem("authToken", token);
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
