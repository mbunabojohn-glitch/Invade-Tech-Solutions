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

// Example API service functions
export const apiService = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  // Contact form endpoints
  submitContactForm: async (
    data: ContactFormData,
  ): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.post("/contact", data);
    return response.data;
  },

  // User endpoints
  getUser: async () => {
    const response = await apiClient.get("/user/profile");
    return response.data;
  },

  updateUser: async (data: Record<string, unknown>) => {
    const response = await apiClient.put("/user/profile", data);
    return response.data;
  },

  // Service endpoints
  getServices: async () => {
    const response = await apiClient.get("/services");
    return response.data;
  },

  getServiceById: async (id: string) => {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  },
};
