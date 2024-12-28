import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Use environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Request Config:", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
