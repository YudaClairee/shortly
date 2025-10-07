import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuthUser";

interface RequireAuthProps {
  children: React.ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, loading } = useAuth();

  // Show loading saat check auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect ke auth page kalo belum login
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // User udah login, tampilkan children
  return <>{children}</>;
}

export default RequireAuth;
