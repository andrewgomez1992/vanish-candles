import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../util/axiosConfig";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const parseJwt = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded;
    } catch (e) {
      console.error("Failed to parse JWT:", e);
      return null;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // 🔁 Update user info when token changes
  useEffect(() => {
    if (!token) return;

    const decodedToken = parseJwt(token);

    if (decodedToken?.email) {
      setUserEmail(decodedToken.email);
    }

    if (decodedToken?.role?.toLowerCase() === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, token, userEmail, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
