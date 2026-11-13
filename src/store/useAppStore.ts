import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface StudentUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  course?: string;
  status: "pending" | "confirmed" | "rejected";
}

interface AppState {
  // Auth state
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  // Student auth state
  studentToken: string | null;
  studentUser: StudentUser | null;
  isStudentAuthenticated: boolean;

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

  setStudentToken: (token: string, user: StudentUser) => void;
  studentLogout: () => void;
}

// Global State Management with Zustand
// Persist: Automatically saves selected state to LocalStorage for persistence across reloads
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // --- INITIAL STATE ---
      token: null,
      user: null,
      isAuthenticated: false,
      studentToken: null,
      studentUser: null,
      isStudentAuthenticated: false,
      isLoading: false,
      error: null,
      theme: "light",

      // --- AUTH ACTIONS ---
      setToken: (token) => set({ token, isAuthenticated: !!token }),

      setUser: (user) => set({ user }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),

      setStudentToken: (studentToken, studentUser) =>
        set({
          studentToken,
          studentUser,
          isStudentAuthenticated: true,
        }),

      studentLogout: () =>
        set({
          studentToken: null,
          studentUser: null,
          isStudentAuthenticated: false,
        }),

      // --- UI ACTIONS ---
      setIsLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "app-store", // localStorage key used for persistence
      // partialize: Defines exactly which pieces of state should be saved to LocalStorage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        theme: state.theme,
        isAuthenticated: state.isAuthenticated,
        studentToken: state.studentToken,
        studentUser: state.studentUser,
        isStudentAuthenticated: state.isStudentAuthenticated,
      }),
    },
  ),
);
