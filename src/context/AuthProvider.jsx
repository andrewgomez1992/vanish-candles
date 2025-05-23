import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../util/axiosConfig";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);

  const parseJwt = (t) => {
    try {
      return JSON.parse(atob(t.split(".")[1]));
    } catch {
      return null;
    }
  };

  // 1️⃣ Load token once on mount
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setToken(stored);
      setIsLoggedIn(true);
    }
  }, []);

  // 2️⃣ When token changes decode & schedule auto-logout
  useEffect(() => {
    if (!token) return;
    const decoded = parseJwt(token);
    if (!decoded) return;

    // Update user info including first name
    if (decoded.email) setUserEmail(decoded.email);
    if (decoded.first_name) setFirstName(decoded.first_name);
    setIsAdmin(decoded.role?.toLowerCase() === "admin");

    // schedule logout at exact token expiry
    if (decoded.exp) {
      const expiresAt = decoded.exp * 1000;
      const msUntil = expiresAt - Date.now();
      if (msUntil > 0) {
        const timer = setTimeout(() => {
          logout();
          window.location.href = "/login";
        }, msUntil);
        return () => clearTimeout(timer);
      } else {
        // already expired
        logout();
      }
    }
  }, [token]);

  // 3️⃣ Keep “current-user” fresh whenever token is valid
  useEffect(() => {
    if (!token) return;
    axiosInstance
      .get("/users/current-user")
      .then((res) => {
        console.log("res.data", res);
        setFirstName(res.data.first_name);
        setUserEmail(res.data.email);
        console.log("✅ current-user:", res.data);
      })
      .catch((err) => console.error("❌ current-user error:", err));
  }, [token]);

  const login = async (email, password) => {
    const { data } = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserEmail(null);
    setFirstName(null);
  };

  console.log("firstName", firstName);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        token,
        userEmail,
        firstName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
