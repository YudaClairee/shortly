import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Dedicated OAuth callback page
 * Langsung clean URL sebelum render apapun buat prevent token spill
 */
function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clean URL immediately BEFORE any render
    if (window.location.hash) {
      const cleanPath = window.location.pathname.replace(
        "/auth/callback",
        "/dashboard"
      );
      window.history.replaceState(null, "", cleanPath);
    }

    // Navigate ke dashboard setelah cleanup
    // Auth state akan dihandle sama AuthContext
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  // Show minimal loading state (tokens udah di-clean dari URL)
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Menyelesaikan login...</p>
      </div>
    </div>
  );
}

export default AuthCallback;
