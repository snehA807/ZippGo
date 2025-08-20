import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
});

// Add token to headers if available
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token"); // saved after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
