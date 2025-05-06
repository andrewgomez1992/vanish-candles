import axios from "axios";

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

// ✨ Attach the Bearer token on every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    console.log("Request Config:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 On any 401 response: clear auth + redirect to login
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired or invalid.");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
