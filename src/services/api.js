import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  timeout: 8000,
});

// ---------------- MIDDLEWARES ----------------

// Request middleware: runs before every request
API.interceptors.request.use(
  (config) => {
    console.log("➡️ Request:", config.method?.toUpperCase(), config.url);

    // Example: attach token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Response middleware: runs on every response
API.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("⚠️ Response error:", error.response.status, error.response.data);
      // Example: handle 401 unauthorized globally
      if (error.response.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
      }
    } else {
      console.error("🚨 Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
