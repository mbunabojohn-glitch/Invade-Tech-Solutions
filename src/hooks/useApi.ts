import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { apiService, type ContactFormData } from "../lib/api";

// Hook for fetching user profile
// Uses React Query's useQuery to fetch data and cache it automatically.
export const useUserProfile = (
  options?: UseQueryOptions<unknown, AxiosError>,
) => {
  return useQuery({
    queryKey: ["user", "profile"], // Unique key for caching this specific request
    queryFn: () => apiService.getUser(), // The actual API call function
    ...options, // Allow overriding default options
  });
};

// Hook for fetching services
// Caches the list of services for 5 minutes to avoid redundant network requests.
export const useServices = (options?: UseQueryOptions<unknown, AxiosError>) => {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => apiService.getServices(),
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    ...options,
  });
};

// Hook for fetching a single service
export const useService = (
  id: string | undefined,
  options?: UseQueryOptions<unknown, AxiosError>,
) => {
  return useQuery({
    queryKey: ["services", id],
    queryFn: () => apiService.getServiceById(id!),
    enabled: !!id, // Only run the query if an ID is actually provided
    ...options,
  });
};

// Hook for updating user profile
// Uses useMutation for operations that change data (POST/PUT/PATCH).
export const useUpdateUser = (
  options?: UseMutationOptions<unknown, AxiosError, Record<string, unknown>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiService.updateUser(data),
    onSuccess: () => {
      // Invalidate the profile query to trigger a refetch with the updated data
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
    ...options,
  });
};

// Hook for submitting contact form
export const useSubmitContactForm = (
  options?: UseMutationOptions<unknown, AxiosError, ContactFormData>,
) => {
  return useMutation({
    // The function that performs the API POST request with the form data
    mutationFn: (data: ContactFormData) => apiService.submitContactForm(data),
    ...options,
  });
};

// Hook for login
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

// Hook for logout
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
