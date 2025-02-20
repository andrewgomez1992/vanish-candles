import  { createContext, useState, useEffect } from "react";
import axiosInstance from "../util/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      const decodedToken = parseJwt(storedToken);
      if (decodedToken?.email?.role?.toLowerCase() === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const parseJwt = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded token:", decoded);
      return decoded;
    } catch (e) {
      console.error("Failed to parse JWT:", e);
      return null;
    }
  };

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
      const decodedToken = parseJwt(token);
      if (decodedToken?.email?.role?.toLowerCase() === "admin") {
        setIsAdmin(true);
      }
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
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
