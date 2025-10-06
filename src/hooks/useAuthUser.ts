import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

/**
 * Custom hook untuk pakai auth context dengan mudah
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Custom hook untuk akses user data dengan mudah
 * Return user object atau null kalo belum login
 */
export function useAuthUser() {
  const { user } = useAuth();
  return user;
}

/**
 * Custom hook untuk check apakah user udah login
 */
export function useIsAuthenticated() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}
