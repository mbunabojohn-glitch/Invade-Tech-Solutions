import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AppState {
  // Auth state
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  // UI state
  isLoading: boolean;
  error: string | null;
  theme: "light" | "dark";

  // Actions
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: "light" | "dark") => void;
  logout: () => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      theme: "light",

      // Actions
      setToken: (token) => set({ token, isAuthenticated: !!token }),

      setUser: (user) => set({ user }),

      setIsLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      setTheme: (theme) => set({ theme }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "app-store", // localStorage key
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        theme: state.theme,
      }),
    },
  ),
);
