import { Wrench, ShoppingCart, GraduationCap, Cloud, Users, Info, Settings, Shield, Server, Monitor, Database, Network } from "lucide-react";
import apiClient from "./apiClient";

export const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    wrench: Wrench,
    shopping: ShoppingCart,
    graduation: GraduationCap,
    cloud: Cloud,
    users: Users,
    info: Info,
    settings: Settings,
    shield: Shield,
    server: Server,
    monitor: Monitor,
    database: Database,
    network: Network,
    // Add more mappings as needed
  };

  return icons[iconName.toLowerCase()] || Info;
};

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  image?: string;
  features?: string[];
}

export interface Client {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  industry?: string;
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
  register: async (data: Record<string, unknown>) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  // --- USER PROFILE ---
  getUser: async () => {
    const response = await apiClient.get("/auth/profile");
    return response.data;
  },

  updateUser: async (data: Record<string, unknown>) => {
    const response = await apiClient.put("/auth/profile", data);
    return response.data;
  },

  // --- CONTACT FORM & LEADS ---
  submitContactForm: async (
    data: ContactFormData,
  ): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.post("/contact", data);
    return response.data;
  },

  getInquiries: async () => {
    const response = await apiClient.get("/contact");
    return response.data;
  },

  getInquiryById: async (id: string) => {
    const response = await apiClient.get(`/contact/${id}`);
    return response.data;
  },

  updateInquiryStatus: async (id: string, status: string) => {
    const response = await apiClient.put(`/contact/${id}/status`, { status });
    return response.data;
  },

  deleteInquiry: async (id: string) => {
    const response = await apiClient.delete(`/contact/${id}`);
    return response.data;
  },

  // --- SERVICES ---
  getServices: async () => {
    const response = await apiClient.get("/services");
    return Array.isArray(response.data) ? response.data : response.data?.data || [];
  },

  getServiceById: async (id: string) => {
    const response = await apiClient.get(`/services/${id}`);
    return response.data?.data || response.data;
  },

  createService: async (data: Partial<Service>) => {
    const response = await apiClient.post("/services", data);
    return response.data;
  },

  updateService: async (id: string, data: Partial<Service>) => {
    const response = await apiClient.put(`/services/${id}`, data);
    return response.data;
  },

  deleteService: async (id: string) => {
    const response = await apiClient.delete(`/services/${id}`);
    return response.data;
  },

  // --- CLIENT PORTFOLIO ---
  getClients: async () => {
    const response = await apiClient.get("/clients");
    return Array.isArray(response.data) ? response.data : response.data?.data || [];
  },

  getClientById: async (id: string) => {
    const response = await apiClient.get(`/clients/${id}`);
    return response.data?.data || response.data;
  },

  createClient: async (data: Partial<Client>) => {
    const response = await apiClient.post("/clients", data);
    return response.data;
  },

  updateClient: async (id: string, data: Partial<Client>) => {
    const response = await apiClient.put(`/clients/${id}`, data);
    return response.data;
  },

  deleteClient: async (id: string) => {
    const response = await apiClient.delete(`/clients/${id}`);
    return response.data;
  },
};
