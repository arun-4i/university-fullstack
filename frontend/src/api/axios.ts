// "use server";
import { getCookie } from "cookies-next";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const token = getCookie("token");

    // Set the Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);
