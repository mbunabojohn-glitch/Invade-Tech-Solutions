import axios from "axios";
import type { AxiosInstance } from "axios";
import { useAppStore } from "../store/useAppStore";

// Base configuration for Axios
// - baseURL: Priority is environment variable, fallback is localhost:3000
// - timeout: Requests will fail after 10 seconds if no response
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token automatically
// This runs before EVERY outgoing API call
apiClient.interceptors.request.use((config) => {
  const state = useAppStore.getState();
  const token = state.studentToken;

  // Check if this is a student portal request
  const isStudentRequest = config.url?.startsWith("/students") || config.url?.startsWith("/classes/student");

  if (isStudentRequest && token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (state.token) {
    // For non-student requests, use the regular token
    config.headers.Authorization = `Bearer ${state.token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto-logout if a 401 Unauthorized error occurs (expired or invalid token)
    if (error.response?.status === 401) {
      const isStudentRoute = window.location.pathname.startsWith("/student");

      if (isStudentRoute) {
        useAppStore.getState().studentLogout();
        window.location.href = "/student/login";
      } else {
        useAppStore.getState().logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
