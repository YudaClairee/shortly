import { createContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getCurrentUser } from "@/db/apiAuth";
import supabase from "@/db/supabase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function untuk refresh user data
  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error refreshing user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    // Helper function buat clean URL dari hash fragments
    const cleanUrl = () => {
      // Pastikan remove hash completely (bahkan sisa # aja)
      const cleanPath = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", cleanPath);
    };

    // Check initial session saat app load
    const initializeAuth = async () => {
      try {
        // Detect kalo ada OAuth callback hash
        const hasAuthHash =
          window.location.hash &&
          (window.location.hash.includes("access_token") ||
            window.location.hash.includes("error"));

        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // Cleanup URL immediately setelah user data retrieved
        if (hasAuthHash) {
          cleanUrl();
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);

        // Clean URL even on error (mungkin ada error hash)
        if (window.location.hash) {
          cleanUrl();
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth state changes (login, logout, token refresh, dll)
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        // Clean URL setelah any auth event yang ada hash
        // Ini handle cases dimana onAuthStateChange trigger setelah hash parsed
        if (window.location.hash) {
          cleanUrl();
        }
      });

      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Export context untuk custom hooks
export { AuthContext };
