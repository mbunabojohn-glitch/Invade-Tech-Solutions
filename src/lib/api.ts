import {
  Wrench,
  ShoppingCart,
  GraduationCap,
  Cloud,
  Users,
  Info,
  Settings,
  Shield,
  Server,
  Monitor,
  Database,
  Network,
  type LucideIcon,
} from "lucide-react";
import apiClient from "./apiClient";

export const getIconComponent = (iconName: string) => {
  const icons: Record<string, LucideIcon> = {
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

export interface NewsArticle {
  id?: string;
  _id: string;
  title: string;
  summary: string;
  url: string;
  originalUrl?: string;
  image?: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
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
    return Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];
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
    return Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];
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

  // --- STUDENT PORTAL ---
  studentRegister: async (data: Record<string, unknown>) => {
    const response = await apiClient.post("/students/register", data);
    return response.data;
  },

  studentLogin: async (data: Record<string, unknown>) => {
    const response = await apiClient.post("/students/login", data);
    return response.data;
  },

  getStudentProfile: async () => {
    const response = await apiClient.get("/students/me");
    return response.data;
  },

  getStudentDashboardStats: async () => {
    const response = await apiClient.get("/students/dashboard");
    return response.data;
  },

  getStudentClasses: async () => {
    const response = await apiClient.get("/students/classes");
    return response.data;
  },

  getStudentWebinars: async () => {
    const response = await apiClient.get("/students/webinars");
    return response.data;
  },

  getStudentResources: async () => {
    const response = await apiClient.get("/students/resources");
    return response.data;
  },

  getMyClasses: async () => {
    const response = await apiClient.get('/classes/student/my-classes');
    return response.data;
  },

  // --- STUDENT WEBINARS ---
  getStudentWebinars: async () => {
    const response = await apiClient.get('/webinars/student/my-webinars');
    return response.data;
  },

  registerForWebinar: async (webinarId: string) => {
    const response = await apiClient.post(`/webinars/${webinarId}/register`);
    return response.data;
  },

  getWebinarRoom: async (webinarId: string) => {
    const response = await apiClient.get(`/webinars/${webinarId}/room`);
    return response.data;
  },

  /**
   * Fetches all tech news articles for the Tech Buzz magazine page.
   * @param category Optional category to filter news
   * @returns Array of NewsArticle objects
   */
  getNews: async (category?: string): Promise<NewsArticle[]> => {
    // Manually encode the category to ensure spaces are %20 not +
    const url = category 
      ? `/news?category=${encodeURIComponent(category)}`
      : "/news";
    const response = await apiClient.get(url);
    return Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];
  },

  /**
   * Fetches news articles by category.
   * @param category The category to filter by
   * @returns Array of NewsArticle objects
   */
  getNewsByCategory: async (category: string): Promise<NewsArticle[]> => {
    // Manually encode the category to ensure spaces are %20 not +
    const response = await apiClient.get(`/news?category=${encodeURIComponent(category)}`);
    return Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];
  },

  /**
   * Fetches a single news article by its unique ID.
   * @param id The article ID
   * @returns A single NewsArticle object
   */
  getNewsById: async (id: string): Promise<NewsArticle> => {
    const response = await apiClient.get(`/news/${id}`);
    return response.data?.data || response.data;
  },

  // --- SHOP ORDERS ---
  createOrder: async (orderData: Record<string, unknown>) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  verifyPayment: async (data: { reference: string; orderId: string }) => {
    const response = await apiClient.post('/orders/verify-payment', data);
    return response.data;
  },
};
