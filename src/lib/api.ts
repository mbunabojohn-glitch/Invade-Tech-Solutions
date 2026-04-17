import apiClient from "./apiClient";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// API Service Object: Centralizes all backend communication
// Each method uses the shared apiClient for consistent headers and error handling
export const apiService = {
  // --- AUTHENTICATION ---
  login: async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  // --- CONTACT FORM ---
  submitContactForm: async (
    data: ContactFormData,
  ): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.post("/contact", data);
    return response.data;
  },

  // --- USER PROFILE ---
  getUser: async () => {
    const response = await apiClient.get("/user/profile");
    return response.data;
  },

  updateUser: async (data: Record<string, unknown>) => {
    const response = await apiClient.put("/user/profile", data);
    return response.data;
  },

  // --- SERVICES ---
  getServices: async () => {
    const response = await apiClient.get("/services");
    return response.data;
  },

  getServiceById: async (id: string) => {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  },
};
