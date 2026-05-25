import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiService, type ContactFormData, type Service, type Client, type NewsArticle } from "../lib/api";

// --- AUTHENTICATION & PROFILE ---

export const useRegister = (
  options?: UseMutationOptions<unknown, AxiosError, Record<string, unknown>>,
) => {
  return useMutation({
    mutationFn: (data) => apiService.register(data),
    ...options,
  });
};

// --- TECH BUZZ ---

/**
 * Hook to fetch all tech news articles.
 * Includes a 10-minute stale time for caching efficiency.
 */
export const useNews = (
  category?: string,
  options?: UseQueryOptions<NewsArticle[], AxiosError>,
) => {
  return useQuery({
    queryKey: ["news", category],
    queryFn: () => apiService.getNews(category),
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

/**
 * Hook to fetch news articles by category.
 */
export const useNewsByCategory = (
  category: string,
  options?: UseQueryOptions<NewsArticle[], AxiosError>,
) => {
  return useQuery({
    queryKey: ["news", "category", category],
    queryFn: () => apiService.getNewsByCategory(category),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

/**
 * Hook to fetch a single news article by its ID.
 * Automatically disabled if no ID is provided.
 */
export const useNewsById = (
  id: string | undefined,
  options?: UseQueryOptions<NewsArticle, AxiosError>,
) => {
  return useQuery({
    queryKey: ["news", "detail", id],
    queryFn: () => apiService.getNewsById(id!),
    enabled: !!id,
    ...options,
  });
};

export const useLogin = (
  options?: UseMutationOptions<
    unknown,
    AxiosError,
    { email: string; password: string }
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }) => apiService.login(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    ...options,
  });
};

export const useLogout = (
  options?: UseMutationOptions<unknown, AxiosError>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
    ...options,
  });
};

export const useUserProfile = (
  options?: UseQueryOptions<unknown, AxiosError>,
) => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: () => apiService.getUser(),
    ...options,
  });
};

export const useUpdateUser = (
  options?: UseMutationOptions<unknown, AxiosError, Record<string, unknown>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
    ...options,
  });
};

// --- CONTACT FORM & LEADS ---

export const useSubmitContactForm = (
  options?: UseMutationOptions<unknown, AxiosError, ContactFormData>,
) => {
  return useMutation({
    mutationFn: (data: ContactFormData) => apiService.submitContactForm(data),
    ...options,
  });
};

export const useInquiries = (options?: UseQueryOptions<unknown, AxiosError>) => {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: () => apiService.getInquiries(),
    ...options,
  });
};

export const useInquiry = (
  id: string | undefined,
  options?: UseQueryOptions<unknown, AxiosError>,
) => {
  return useQuery({
    queryKey: ["inquiries", id],
    queryFn: () => apiService.getInquiryById(id!),
    enabled: !!id,
    ...options,
  });
};

export const useUpdateInquiryStatus = (
  options?: UseMutationOptions<unknown, AxiosError, { id: string; status: string }>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => apiService.updateInquiryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
    ...options,
  });
};

export const useDeleteInquiry = (
  options?: UseMutationOptions<unknown, AxiosError, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiService.deleteInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
    ...options,
  });
};

// --- SERVICES ---

export const useServices = (options?: UseQueryOptions<Service[], AxiosError>) => {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => apiService.getServices(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useService = (
  id: string | undefined,
  options?: UseQueryOptions<Service, AxiosError>,
) => {
  return useQuery({
    queryKey: ["services", id],
    queryFn: () => apiService.getServiceById(id!),
    enabled: !!id,
    ...options,
  });
};

export const useCreateService = (
  options?: UseMutationOptions<unknown, AxiosError, Partial<Service>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    ...options,
  });
};

export const useUpdateService = (
  options?: UseMutationOptions<unknown, AxiosError, { id: string; data: Partial<Service> }>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiService.updateService(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["services", id] });
    },
    ...options,
  });
};

export const useDeleteService = (
  options?: UseMutationOptions<unknown, AxiosError, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiService.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    ...options,
  });
};

// --- CLIENT PORTFOLIO ---

export const useClients = (options?: UseQueryOptions<Client[], AxiosError>) => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => apiService.getClients(),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

export const useClient = (
  id: string | undefined,
  options?: UseQueryOptions<Client, AxiosError>,
) => {
  return useQuery({
    queryKey: ["clients", id],
    queryFn: () => apiService.getClientById(id!),
    enabled: !!id,
    ...options,
  });
};

export const useCreateClient = (
  options?: UseMutationOptions<unknown, AxiosError, Partial<Client>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    ...options,
  });
};

export const useUpdateClient = (
  options?: UseMutationOptions<unknown, AxiosError, { id: string; data: Partial<Client> }>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => apiService.updateClient(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["clients", id] });
    },
    ...options,
  });
};

export const useDeleteClient = (
  options?: UseMutationOptions<unknown, AxiosError, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiService.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    ...options,
  });
};

// --- STUDENT PORTAL ---

export const useStudentRegister = (
  options?: UseMutationOptions<unknown, AxiosError, Record<string, unknown>>,
) => {
  return useMutation({
    mutationFn: (data) => apiService.studentRegister(data),
    ...options,
  });
};

export const useStudentLogin = (
  options?: UseMutationOptions<unknown, AxiosError, Record<string, unknown>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.studentLogin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    },
    ...options,
  });
};

export const useStudentProfile = (
  options?: UseQueryOptions<unknown, AxiosError>,
) => {
  return useQuery({
    queryKey: ["student", "profile"],
    queryFn: () => apiService.getStudentProfile(),
    ...options,
  });
};

export const useStudentDashboardStats = (
  options?: UseQueryOptions<unknown, AxiosError>,
) => {
  return useQuery({
    queryKey: ["student", "dashboard"],
    queryFn: () => apiService.getStudentDashboardStats(),
    ...options,
  });
};

export const useStudentClasses = (
  options?: UseQueryOptions<unknown, AxiosError>,
) => {
  return useQuery({
    queryKey: ["student", "classes"],
    queryFn: () => apiService.getStudentClasses(),
    ...options,
  });
};

export const useStudentResources = (
  options?: UseQueryOptions<unknown, AxiosError>,
) => {
  return useQuery({
    queryKey: ["student", "resources"],
    queryFn: () => apiService.getStudentResources(),
    ...options,
  });
};

export const useMyClasses = () => {
  return useQuery({
    queryKey: ['my-classes'],
    queryFn: () => apiService.getMyClasses(),
  });
};

export const useStudentWebinars = (
  options?: UseQueryOptions<unknown, AxiosError>,
) => {
  return useQuery({
    queryKey: ["student", "webinars"],
    queryFn: () => apiService.getStudentWebinars(),
    refetchInterval: 30000, // Poll every 30 seconds for real-time status updates
    ...options,
  });
};

export const useRegisterForWebinar = (
  options?: UseMutationOptions<unknown, AxiosError, string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (webinarId: string) => apiService.registerForWebinar(webinarId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", "webinars"] });
    },
    ...options,
  });
};

export const useWebinarRoom = (
  webinarId: string | undefined,
  options?: UseQueryOptions<unknown, AxiosError>,
) => {
  return useQuery({
    queryKey: ["webinar", "room", webinarId],
    queryFn: () => apiService.getWebinarRoom(webinarId!),
    enabled: !!webinarId,
    ...options,
  });
};
